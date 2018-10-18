/* eslint-disable class-methods-use-this */
import ordersController from '../controllers/ordersController';
import validateReq from '../validations/validateRequests';
import authorize from '../authorization/authorization';

class Orders {
  Orders(router) {
    router.route('/api/v1/orders')
      .get(authorize.user, authorize.admin, ordersController.getOrders)
      .post(authorize.user, validateReq.validateOrders, ordersController.placeOrder);

    router.route('/api/v1/orders/:id')
      .get(validateReq.validateId, authorize.user, authorize.admin, ordersController.getOrder)
      .put(validateReq.validateId, authorize.user, authorize.admin,
        validateReq.validateModifyOrders, ordersController.updateOrderStatus);

    router.route('/api/v1/users/:id/orders')
      .get(validateReq.validateId, authorize.user, ordersController.getUserOrders);
  }
}

const orders = new Orders();
export default orders;
