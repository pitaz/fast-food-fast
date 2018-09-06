import express from 'express';
import ordersController from '../controllers/ordersController';
import validateReq from '../validations/validateRequests';


const router = express.Router();
router.use(express.json());

router.get('/orders', ordersController.getOrders);

router.get('/orders/:id', validateReq.validateId, ordersController.getOrder);

router.post(
  '/orders',
  validateReq.validateOrders, ordersController.placeOrder
);

router.put(
  '/orders/:id', validateReq.validateId,
  validateReq.validateModifyOrders, ordersController.updateOrderStatus
);

router.delete(
  '/orders/:id',
  validateReq.validateId, ordersController.deleteOrder
);

export default router;
