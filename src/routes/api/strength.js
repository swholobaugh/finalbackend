import { Router } from 'express'
import * as strengthServices from '../../services/strength'
import auth from '../../helpers/auth'

const router = Router();

router.get('/strength', async (req, res) => res.send(await strengthServices.getStrengthData()));

router.get('/marketstatus', async (req, res) => res.send(await strengthServices.getMarketStatus()));

router.get('/strength/pairs', async (req, res) => res.send(await strengthServices.getPairStrengthData()));

router.get('/strength/pairs/:pair', auth, async (req, res) => { 
    res.send(await strengthServices.getByPairSymbol(req.params.id))
})

export default router