/* eslint-disable class-methods-use-this */
import mealsController from '../controllers/menuController';
import validateReq from '../validations/validateRequests';
import authorize from '../authorization/authorization';

class Meals {
  meals(router) {
    router.route('/api/v1/menu')
      .post(authorize.user, authorize.admin, validateReq.validateMeal, mealsController.createMenu)
      .get(authorize.user, mealsController.getMenu);

    router.route('/api/v1/menu/:id')
      .get(validateReq.validateId, mealsController.getMealById)
      .put(validateReq.validateId, validateReq.checkMealId,
        validateReq.validateUpdateMeal, mealsController.updateMeal);
  }
}

const meal = new Meals();
export default meal;
