import '../helpers/dotenv';
import '../helpers/axios';
import '../helpers/db';
import db from '../helpers/db';

import oandaInstance from '../helpers/axios';

const params = {
    instruments: 'AUD_USD'
}

let journal = [];

const getPricing = async () => {
    const response = await oandaInstance.get(`/v3/accounts/${process.env.OANDA_API_ACCT}/pricing/`, {params})
    journal = {
        date: response.data.prices[0].time,
        instrument: response.data.prices[0].instrument
    }
    return journal;
}

export const pushToDb = async () => {
    try {
        const pricing = await getPricing()
        const instJournal = await db('journal').insert(journal)
        const confirmEntry = await console.log("Entry Inserted");
    }
    catch{
        ((err) => { console.log(err); throw err})
    }
}

export const getAll = async () => {
    console.log(await db('journal'));
}
