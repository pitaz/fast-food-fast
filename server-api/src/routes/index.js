import express from 'express';
import od from './orders';
import ml from './meals';
import usr from './users';
import nf from './routeNotFound';


const router = express.Router();
router.use(express.json());

ml.meals(router);
od.Orders(router);
usr.users(router);
nf.notFound(router);

// router.use('/api/v1/', users);


export default router;
