import '../helpers/dotenv';
import '../helpers/axios';
import '../helpers/db';
import db from '../helpers/db';
import axios from 'axios';

const scheduler = require('node-schedule');

//45 15 * * * = Update daily at 3:45pm
export const updateDailyStrengthData = () => {scheduler.scheduleJob('45 15 * * *', async () => {
    const data = await getPairStrengthData();
    await pushToStrengthDb(data);
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

export const getPairStrengthData = async () => {
    const response = await axios.get(`https://api.currencyquake.com/pairs/d1/`);
    const strengthData = [];

    for(var x = 0; x < response.data.length; x++) {
        
        const strengthEntry = {
            pair: formatPair(response.data[x].pair),
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

export const getByPairSymbol = async (data) => {
    const response = await axios.get(`https://api.currencyquake.com/pairs/d1/`);

    for(var x = 0; x < response.data.length; x++) {
        
        if(formatPair(response.data[x].pair) == data) {
            const pair = {
                pair: formatPair(response.data[x].pair),
                change: response.data[x].change.toString(),
                timeframe: 'D1',
            }
            return pair
        }
    }
}

export const clearStrengthDb = async () => {
    await db('strength').select().del()
}


//Utility Functions

export const formatPair = (str) => {
    const newString = (str.substring(0,3) + '_' + str.substring(3)).toUpperCase()
    return newString
}