import { Router } from 'express'
import * as journalServices from '../../services/journal'

const router = Router();

router.get('/journal', async (req, res) => res.send(await journalServices.getJournalAll()));

router.get('/journal/positions', async (req,res) => res.send(await journalServices.getPositions()));



export default router