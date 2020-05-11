import './dotenv';
import axios from 'axios';

const oandaInstance = axios.create({
    baseURL: 'https://api-fxpractice.oanda.com',
})

oandaInstance.defaults.headers.common['Content-Type'] = 'application/json';
oandaInstance.defaults.headers.common['Authorization'] = `Bearer ${process.env.OANDA_API_KEY}`;
oandaInstance.defaults.headers.common['Accept-Datetime-Format'] = 'UNIX';

export default oandaInstance;

export const currencyStrengthInstance = axios.create({
    baseURL: 'https://api.currencyquake.com/pairs/'
});

