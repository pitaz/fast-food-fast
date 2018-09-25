/* eslint-disable class-methods-use-this */
import express from 'express';
import meals from '../sampleData/mealsStorage';

const router = express.Router();
router.use(express.json());

class MealsControllers {
  createMeal(req, res) {
    if (!req.body.name || req.body.name.length < 3) {
      res.status(400).send('Name is required and should be minimum 3 characters');
      return;
    }
    const meal = {
      id: meals.length + 1,
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      image: req.body.image
    };
    meals.push(meal);
    return res.status(201).send(meal);
  }

  getMeals(req, res) {
    return res.status(200).send(meals);
  }

  updateMeal(req, res) {
    const meal = meals.find(f => f.id === parseInt(req.params.id, 10));
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    meal.name = req.body.name;
    meal.desc = req.body.desc;
    meal.price = req.body.price;
    meal.image = req.body.image;
    return res.status(200).json(meal);
  }

  deleteMeal(req, res) {
    const index = meals.indexOf();
    meals.splice(index, 1);
    return res.status(201).json({ message: 'meal deleted successfully!' });
  }
}

const mealsControllers = new MealsControllers();
export default mealsControllers;
