import '../helpers/dotenv';
import '../helpers/axios';
import '../helpers/db';
import db from '../helpers/db';
import axios from 'axios';
import Joi from '@hapi/joi';

import oandaInstance from '../helpers/axios';

export const checkState = async () => {
    const dbLastID = await db('journal').select('id').max('id')
    //const journalLastID = dbLastID[0].id
    const response = await oandaInstance.get(`/v3/accounts/${process.env.OANDA_API_ACCT}/`)
    const lastID = parseInt(response.data.lastTransactionID);
    
    if(dbLastID[0].id != lastID) {
        const params = {id: dbLastID[0].id}
        console.log(params);
        return params;
    } else {
        return 0;
    }
}

export const getAPIdata = async () => {
    const response = await oandaInstance.get(`/v3/accounts/${process.env.OANDA_API_ACCT}/transactions/sinceid`, {params});

    //const orderresponse = await oandaInstance.get(`/v3/accounts/${process.env.OANDA_API_ACCT}/orders`);

    console.log(response.data.transactions);

    //console.log(orderresponse.data);
}

export const getLatestTransactions = async (params) => {
    const getState = await checkState();
    if(getState != 0) {
        const transactions = await getAllTransactions(getState);
        await pushToJournalDb(transactions);    
    } else {
        console.log("Database up to date");
    }
}

export const getAllTransactions = async (params) => {
    const response = await oandaInstance.get(`/v3/accounts/${process.env.OANDA_API_ACCT}/transactions/sinceid`, {params});
    var journal = [];

    for(var x = 0; x < response.data.transactions.length; x++) {
        
        const journalEntry = {
            id: response.data.transactions[x].id,
            date: response.data.transactions[x].time,
            type: response.data.transactions[x].type,
            instrument: response.data.transactions[x].instrument,
            units: response.data.transactions[x].units,
            price: response.data.transactions[x].price,
            batchid: response.data.transactions[x].batchID,
            orderid: response.data.transactions[x].orderID,
            userid: response.data.transactions[x].userID.toString(),
            strength: ""
        }
        journal.push(journalEntry);
    }

    return journal;
}

export const fillJournalDb = async () => {
    const params = await { id: 0 }
    const journal = await getAllTransactions(params)
    await pushToJournalDb(journal);
}

export const pushAllTransactions = async () => {
    const journal = await getAllTransactions()
    try {
        await db('journal').insert(journal);
        console.log("Entries Inserted");
    }
    catch {
        ((err) => { console.log(err); throw err})
    }
}

export const pushToJournalDb = async (journal) => {
    try {
        await db('journal').insert(journal);
        console.log("Entries Inserted");
    }
    catch {
        ((err) => { console.log(err); throw err})
    }
}

export const getJournalAll = async () => {
    const journal = await db('journal');
    return journal;
}

export const getJournalById = async id => {
    const journal = await db('journal').where({ id }).first()
}