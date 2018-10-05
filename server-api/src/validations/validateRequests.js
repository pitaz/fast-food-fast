/* eslint-disable class-methods-use-this */
import orders from '../sampleData/ordersStorage';
import meals from '../sampleData/mealsStorage';
import users from '../sampleData/usersStorage';
import obj from '../helpers/isEmpty';
import checkEmail from '../helpers/isEmail';

class ValidateRequest {
  validateId(req, res, next) {
    if (isNaN(req.params.id)) {
      return res.status(400).send('Id is invalid');
    }

    next();
  }

  checkMealId(req, res, next) {
    const meal = meals.find(f => f.id === parseInt(req.params.id, 10));
    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    next();
  }


  checkOrderId(req, res, next) {
    const order = orders.find(f => f.id === parseInt(req.params.id, 10));
    if (!order) return res.status(404).json({ message: 'order not found' });

    next();
  }

  validateOrders(req, res, next) {
    const errors = {};

    if (!req.body.meal || req.body.meal === '') errors.meal = 'Meal field is required';

    if (!req.body.quantity || req.body.quantity === '') errors.quantity = 'Quantity is required';

    if (!req.body.userId || req.body.userId === '') errors.userId = 'Enter userId';

    // if (!req.body.status || req.body.status === '') errors.status = 'Enter status';

    if (!req.body.price || req.body.price === '') errors.price = 'price is required';

    if (req.body.quantity) {
      if (isNaN(req.body.quantity)) {
        errors.quantity = 'quantity must be a number';
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

    if (!req.body.meal || req.body.meal === '') errors.meal = 'Meal field is required';

    if (!req.body.quantity || req.body.quantity === '') errors.quantity = 'Quantity is required';

    if (!req.body.userId || req.body.userId === '') errors.userId = 'Enter userId';

    // if (!req.body.status || req.body.status === '') errors.status = 'Enter status';

    if (!req.body.price || req.body.price === '') errors.price = 'price is required';

    if (req.body.quantity.trim()) {
      if (isNaN(req.body.quantity.trim())) {
        errors.quantity = 'quantity must be a number';
      }
    }

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name || req.body.name === '') errors.name = 'name field is required';

    if (!req.body.description || req.body.description === '') errors.description = 'description field is required';

    if (!req.body.price || req.body.price === '') errors.price = 'price field is required';

    if (isNaN(req.body.price || req.body.price)) errors.price = 'price must be a number';

    if (!req.body.image || !req.body.image) errors.image = 'image is required';

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateUpdateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name.trim()) errors.name = 'name is required';

    if (!req.body.desc.trim()) errors.desc = 'description field is required';

    if (!req.body.price.trim()) errors.price = 'price field is required';

    if (!req.body.price.trim()) errors.price = 'price must be a number';

    if (!req.body.image.trim()) errors.image = 'image is required';

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateNewUser(req, res, next) {
    const errors = {};

    if (!req.body.name && typeof string === 'undefined') errors.name = 'name is required';

    if (!req.body.email && typeof string === 'undefined') errors.email = 'email is required';

    if (!req.body.password && typeof string === 'undefined') errors.password = 'password is required';

    if (!req.body.email && typeof string === 'undefined') errors.email = 'email is required';

    if (!checkEmail.validateEmail(req.body.email)) {
      errors.email = 'Email is invalid';
    }

    if (req.body.password && typeof string === 'undefined' && req.body.password.length < 6) errors.password = 'Password must be greater than 6 characters';

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateLoginUser(req, res, next) {
    const errors = {};

    if (!req.body.email && typeof string === 'undefined') errors.email = 'Email is required';

    if (req.body.email && typeof string === 'undefined' && !checkEmail.validateEmail(req.body.email.trim())) errors.email = 'Email is invalid';

    if (!req.body.password && typeof string === 'undefined') errors.password = 'Password is required';
    if (req.body.password && typeof string === 'undefined' && req.body.password.length < 6) errors.password = 'Password must be greater than 6 characters';

    const error = obj.isEmpty(errors);

    if (error) {
      return res.status(400).json({ error: errors });
    }

    next();
  }
}

const validateReq = new ValidateRequest();
export default validateReq;
