import './helpers/dotenv';
import oandaInstance from './helpers/axios.js';

import express from 'express';

import router from './routes';

const app = express();
const port = parseInt(process.env.PORT);

const params = {
    instruments: 'AUD_USD'
}

oandaInstance.get(`/v3/accounts/${process.env.OANDA_API_ACCT}/pricing/`, {params})
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });

app.use(router);
app.listen(port);