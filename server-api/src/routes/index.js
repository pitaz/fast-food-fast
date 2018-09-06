import express from 'express';
import orders from './orders';
import meals from './meals';
import notFound from './routeNotFound';


const router = express.Router();

router.use('/api/v1', orders);
router.use('/api/v1', meals);
router.use('/', notFound);


export default router;
