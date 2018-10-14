import express from 'express';
import od from './orders';
import ml from './menu';
import usr from './users';
import nf from './routeNotFound';


const router = express.Router();

ml.meals(router);
od.Orders(router);
usr.users(router);
nf.notFound(router);


export default router;
