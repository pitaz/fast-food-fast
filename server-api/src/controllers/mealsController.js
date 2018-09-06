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
}

const mealsControllers = new MealsControllers();
export default mealsControllers;
