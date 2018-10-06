import express from 'express';
import bodyParser from 'body-parser';
import od from './orders';
import ml from './menu';
import usr from './users';
import nf from './routeNotFound';


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

ml.meals(router);
od.Orders(router);
usr.users(router);
nf.notFound(router);

// router.use('/api/v1/', users);


export default router;
