import './helpers/dotenv';

import { notFound, errorHandler } from './helpers/errors';
import * as journalServices from './services/journal';
import * as strengthServices from './services/strength';

import express from 'express';
import router from './routes';
import cors from 'cors';
import helmet from 'helmet';



const app = express();
const port = parseInt(process.env.PORT);

app.use(cors({ origin: process.env.ORIGIN }));
app.use(helmet());
app.use(express.json());

app.use(router);

app.use(notFound);
app.use(errorHandler);

app.listen(port);

journalServices.fillJournalDb();
strengthServices.updateDailyStrengthData();
journalServices.getPositions();