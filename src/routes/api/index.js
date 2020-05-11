import { Router } from 'express';
import journalRoutes from './journal';
import strengthRoutes from './strength';

const router = Router();

router.get('/api', (req, res) => {
    res.json({ msg: 'Hello from API'})
})

router.use('/api', journalRoutes, strengthRoutes)


export default router;