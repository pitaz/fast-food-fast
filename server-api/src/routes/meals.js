import express from 'express';
import mealsController from '../controllers/mealsController';
import validateReq from '../validations/validateRequests';


const router = express.Router();
router.use(express.json());

router.route('/')
.post(validateReq.validateMeal, mealsController.createMeal)
.get(mealsController.getMeals);

router.route('/:id')
.put(validateReq.validateId, validateReq.checkMealId,
  validateReq.validateUpdateMeal, mealsController.updateMeal)
.delete( validateReq.checkMealId,
  validateReq.validateId, mealsController.deleteMeal);

export default router;
