import '../helpers/dotenv';
import '../helpers/axios';
import '../helpers/db';
import db from '../helpers/db';
import axios from 'axios';

const scheduler = require('node-schedule');

//45 15 * * * = Update daily at 3:45pm
export const updateDailyStrengthData = () => {scheduler.scheduleJob('50 * * * *', async () => {
    const data = await getStrengthData();
    await pushToStrengthDb(data);
    await getAllStrengthDb();
})}

export const updateStrengthData = async () => {
    const data = await getStrengthData();
    await pushToStrengthDb(data);
    console.log(getAllStrengthDb());
}

export const getStrengthData = async () => {
    const response = await axios.get(`https://api.currencyquake.com/symbols/d1/`);
    const strengthData = [];

    for(var x = 0; x < response.data.length; x++) {
        
        const strengthEntry = {
            symbol: response.data[x].symbol,
            change: response.data[x].change.toString(),
            timeframe: 'D1',
        }
        strengthData.push(strengthEntry);
    }
    return strengthData;
}

export const getMarketStatus = async () => {
    const response = await axios.get(`https://api.currencyquake.com/market-status/`);
    return response.data;
}

export const pushToStrengthDb = async (data) => {
    try {
        await db('strength').insert(data);
        console.log("Entries Inserted");
    }
    catch {
        ((err) => { console.log(err); throw err})
    }
}

export const getAllStrengthDb = async () => {
    const strength = await db('strength');
    console.log(strength);
}

export const clearStrengthDb = async () => {
    await db('strength').select().del()
}

