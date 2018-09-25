import express from 'express';
import ordersController from '../controllers/ordersController';
import validateReq from '../validations/validateRequests';


const router = express.Router();
router.use(express.json());
router.route('/')
  .get(ordersController.getOrders)
  .post(validateReq.validateOrders, ordersController.placeOrder);

router.route('/:id')
  .get(validateReq.validateId, ordersController.getOrder)
  .put(validateReq.validateId, validateReq.checkOrderId,
    validateReq.validateModifyOrders, ordersController.updateOrderStatus)
  .delete(validateReq.checkOrderId,
    validateReq.validateId, ordersController.deleteOrder);

export default router;
