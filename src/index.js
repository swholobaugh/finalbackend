import './helpers/dotenv';
import * as journalServices from './services/journal';

import express from 'express';
import router from './routes';

const app = express();
const port = parseInt(process.env.PORT);



app.use(router);
app.listen(port);


journalServices.pushToDb();
journalServices.getAll();