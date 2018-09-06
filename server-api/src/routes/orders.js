import express from 'express';
import ordersController from '../controllers/ordersController';
import validateReq from '../validations/validateRequests';


const router = express.Router();
router.use(express.json());

router.get('/orders', ordersController.getOrders);

router.post(
  '/orders',
  validateReq.validateOrders, ordersController.placeOrder
);

export default router;
