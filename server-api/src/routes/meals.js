/* eslint-disable class-methods-use-this */
import mealsController from '../controllers/mealsController';
import validateReq from '../validations/validateRequests';

class Meals {
  meals(router) {
    router.route('/api/v1/menu')
      .post(validateReq.validateMeal, mealsController.createMenu)
      .get(mealsController.getMenu);

    router.route('/api/v1/menu/:id')
      .get(validateReq.validateId, mealsController.getMealById)
      .put(validateReq.validateId, validateReq.checkMealId,
        validateReq.validateUpdateMeal, mealsController.updateMeal)
      .delete(validateReq.checkMealId, validateReq.validateId, mealsController.deleteMeal);
  }
}

const meal = new Meals();
export default meal;
