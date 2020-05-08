import { Router } from 'express'
import * as strengthServices from '../../services/strength'
import auth from '../../helpers/auth'

const router = Router();

/* Note: At this time there is no function to access the database
to get currency strength, and I dont plan to provide that at the moment.
These functions just serve as stubs for the future. For now, only current
strength is provided.

router.get('/strength', async (req, res) => res.send(await strengthServices.getAllStrengthDb()));

router.get('/strength/:id', async (req, res) => {
    const strength = await strengthServices.(req.params.id)
    strength ? res.send(strength) : res.status(404).end()
})
*/

router.get('/currentstrength', async (req, res) => res.send(await strengthServices.getStrengthData()));

router.get('/marketstatus', async (req, res) => res.send(await strengthServices.getMarketStatus()))


export default router