import '../helpers/dotenv';
import oandaInstance from '../helpers/axios';
    
oandaInstance.get(`/v3/accounts/${process.env.OANDA_API_ACCT}/pricing/AUD_USD`)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

