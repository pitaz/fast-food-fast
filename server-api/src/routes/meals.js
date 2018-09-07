import express from 'express';
import mealsController from '../controllers/mealsController';
import validateReq from '../validations/validateRequests';


const router = express.Router();
router.use(express.json());

router.post(
  '/meals',
  validateReq.validateMeal, mealsController.createMeal
);

router.get('/meals', mealsController.getMeals);

router.put(
  '/meals/:id', validateReq.validateId,
  validateReq.validateUpdateMeal, mealsController.updateMeal
);

router.delete(
  '/meals/:id',
  validateReq.validateId, mealsController.deleteMeal
);

export default router;
