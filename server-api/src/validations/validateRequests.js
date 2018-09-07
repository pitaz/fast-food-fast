/* eslint-disable class-methods-use-this */
import validator from 'validator';
import isNumber from 'is-number';
import isEmpty from 'lodash/isEmpty';
import orders from '../sampleData/ordersStorage';
import meals from '../sampleData/mealsStorage';

class ValidateRequest {
  validateId(req, res, next) {
    if (!isNumber(req.params.id)) {
      return res.status(400).send('Id is invalid');
    }

    return next();
  }

  validateOrders(req, res, next) {
    const errors = {};

    if (!req.body.meal) errors.meal = 'Enter a meal';

    if (!req.body.quantity) errors.quantity = 'Enter quantity';

    if (req.body.quantity) {
      if (!isNumber(req.body.quantity.trim())) {
        errors.quantity = 'quantity must be a number';
      }
    }

    const isValid = isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }

  validateModifyOrders(req, res, next) {
    const errors = {};

    const order = orders.find(f => f.id === parseInt(req.params.id, 10));
    if (!order) return res.status(404).json({ message: 'order not found' });

    if (!req.body.meal && !req.body.quantity) errors.message = 'Enter a field to update';

    if (!req.body.meal) errors.meal = 'Meal is required';

    if (!req.body.quantity) errors.quantity = 'quantity is required';

    if (req.body.quantity) {
      if (!isNumber(req.body.quantity.trim())) {
        errors.quantity = 'quantity must be a number';
      }
    }

    const isValid = isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }

  validateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name) errors.name = 'name field is required';

    if (!req.body.desc) errors.desc = 'description field is required';

    if (!req.body.price.trim()) errors.price = 'price field is required';

    if (!isNumber(req.body.price.trim())) errors.price = 'price must be a number';

    if (!req.body.image || validator.isEmpty(req.body.image)) errors.image = 'image is required';

    const isValid = isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }

  validateUpdateMeal(req, res, next) {
    const errors = {};

    const meal = meals.find(f => f.id === parseInt(req.params.id, 10));
    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    if (!req.body.name && !req.body.desc && !req.body.price) {
      errors.message = 'Enter a field to update';
    }

    if (!req.body.name) errors.name = 'name is required';

    if (!req.body.desc) errors.desc = 'description field is required';

    if (!req.body.price) errors.price = 'price field is required';

    if (!req.body.price) errors.price = 'price must be a number';

    if (!req.body.image) errors.image = 'image is required';

    const isValid = isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }
}

const validateReq = new ValidateRequest();
export default validateReq;
