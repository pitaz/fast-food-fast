/* eslint-disable class-methods-use-this */
import orders from '../sampleData/ordersStorage';
import meals from '../sampleData/mealsStorage';
import users from '../sampleData/usersStorage';
import obj from '../helpers/isEmpty';
import checkEmail from '../helpers/isEmail';

class ValidateRequest {
  validateId(req, res, next) {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: 'true',
        message: 'Invalid Id'
      });
    }

    next();
  }

  checkMealId(req, res, next) {
    const meal = meals.find(f => f.id === parseInt(req.params.id, 10));
    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    next();
  }


  validateOrders(req, res, next) {
    const errors = {};

    if (!req.body.meal || (req.body.meal.trim() === '' || typeof req.body.meal === 'undefined')) errors.meal = 'meal is required';

    if (!req.body.quantity || (req.body.quantity.trim() === '' || typeof req.body.quantity === 'undefined')) errors.quantity = 'quantity is required';

    if (!req.body.userId || (req.body.userId.trim() === '' || typeof req.body.userId === 'undefined')) errors.userId = 'userId is required';

    if (!req.body.price || (req.body.price.trim() === '' || typeof req.body.price === 'undefined')) errors.price = 'price is required';

    if (req.body.quantity) {
      if (isNaN(req.body.quantity)) {
        errors.quantity = 'quantity must be a number';
      }
    }

    if (req.body.price) {
      if (isNaN(req.body.price)) {
        errors.price = 'price must be a number';
      }
    }

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateModifyOrders(req, res, next) {
    const errors = {};

    if (!req.body.status || (req.body.status.trim() === '' || typeof req.body.status === 'undefined')) errors.status = 'Status is required';

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name || (req.body.name.trim() === '' || typeof req.body.name === 'undefined')) errors.name = 'name is required';

    if (!req.body.description || (req.body.description.trim() === '' || typeof req.body.description === 'undefined')) errors.description = 'description is required';

    if (!req.body.price || (req.body.price.trim() === '' || typeof req.body.price === 'undefined')) errors.price = 'price is required';

    if (isNaN(req.body.price)) errors.price = 'price must be a number';

    if (!req.body.image || (req.body.image.trim() === '' || typeof req.body.image === 'undefined')) errors.image = 'image is required';

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateUpdateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name && typeof string === 'undefined') errors.name = 'name is required';

    if (!req.body.description && typeof string === 'undefined') errors.description = 'description field is required';

    if (!req.body.price && typeof string === 'undefined') errors.price = 'price field is required';

    if (isNaN(req.body.price && typeof string === 'undefined')) errors.price = 'price must be a number';

    if (!req.body.image && typeof string === 'undefined') errors.image = 'image is required';

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateNewUser(req, res, next) {
    const errors = {};

    if (!req.body.name || (req.body.name.trim() === '' || typeof req.body.name === 'undefined')) errors.name = 'name is required';

    if (!req.body.email || (req.body.email.trim() === '' || typeof req.body.email === 'undefined')) errors.email = 'email is required';

    if (!req.body.password || (req.body.password.trim() === '' || typeof req.body.password === 'undefined')) errors.password = 'password is required';

    if (!checkEmail.validateEmail(req.body.email)) {
      errors.email = 'email is invalid';
    }

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateLoginUser(req, res, next) {
    const errors = {};

    if (!req.body.email || (req.body.email.trim() === '' || typeof req.body.email === 'undefined')) errors.email = 'email is required';

    if (!checkEmail.validateEmail(req.body.email)) errors.email = 'email is invalid';

    if (!req.body.password || (req.body.password.trim() === '' || typeof req.body.password === 'undefined')) errors.password = 'Password is required';

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }
}

const validateReq = new ValidateRequest();
export default validateReq;
