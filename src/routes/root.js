import { Router } from 'express';


const router = Router();

router.get('/', (req, res) => {
    res.json({msg: process.env.APP_NAME});
});


export default router;