import { Router } from 'express'
import * as journalServices from '../../services/journal'
import auth from '../../helpers/auth'

const router = Router();

router.get('/journal', async (req, res) => res.send(await journalServices.getJournalAll()));

router.get('/journal/:id', async (req, res) => {
    const post = await journalServices.getJournalById(req.params.id)
    journal ? res.send(journal) : res.status(404).end()
})


export default router