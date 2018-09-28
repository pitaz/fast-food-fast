/* eslint-disable class-methods-use-this */
import ordersController from '../controllers/ordersController';
import validateReq from '../validations/validateRequests';

class Orders {
  Orders(router) {
    router.route('/api/v1/orders')
      .get(ordersController.getOrders)
      .post(validateReq.validateOrders, ordersController.placeOrder);

    router.route('/api/v1/orders/:id')
      .get(validateReq.validateId, ordersController.getOrder)
      .put(validateReq.validateId, validateReq.checkOrderId,
        validateReq.validateModifyOrders, ordersController.updateOrderStatus)
      .delete(validateReq.checkOrderId,
        validateReq.validateId, ordersController.deleteOrder);
  }
}

const orders = new Orders();
export default orders;
