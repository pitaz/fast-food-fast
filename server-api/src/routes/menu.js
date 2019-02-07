/* eslint-disable class-methods-use-this */
import mealsController from '../controllers/menuController';
import validateReq from '../validations/validateRequests';
import authorize from '../authorization/authorization';

class Meals {
  meals(router) {
    router.route('/api/v1/menu')
      .post(authorize.user, authorize.admin, validateReq.validateMeal, mealsController.createMenu)
      .get(mealsController.getMenu);

    router.route('/api/v1/menu/:id')
      .get(validateReq.validateId, mealsController.getMealById)
      .put(authorize.user, authorize.admin, validateReq.validateId,
        validateReq.validateUpdateMeal, mealsController.updateMenu)
      .delete(authorize.user, authorize.admin, validateReq.validateId,
        mealsController.deleteMenu);
  }
}

const meal = new Meals();
export default meal;
