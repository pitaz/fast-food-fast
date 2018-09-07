/* eslint-disable class-methods-use-this */
import validator from 'validator';
import isNumber from 'is-number';
import isEmpty from 'lodash/isEmpty';

class ValidateRequest {
  validateId(req, res, next) {
    if (!isNumber(req.params.id)) {
      return res.status(400).send('Id is invalid');
    }

    return next();
  }

  validateOrders(req, res, next) {
    const errors = {};

    if (!req.body.meal || validator.isEmpty(req.body.meal.trim())) {
      errors.meal = 'Enter a meal';
    }

    if (!req.body.quantity || validator.isEmpty(req.body.quantity.trim())) {
      errors.quantity = 'Enter quantity';
    }

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

    if (!req.body.meal && !req.body.quantity) {
      errors.message = 'Enter a field to update';
    }

    if (req.body.meal && validator.isEmpty(req.body.meal.trim())) {
      errors.meal = 'Meal is required';
    }

    if (req.body.quantity && validator.isEmpty(req.body.quantity.trim())) {
      errors.quantity = 'quantity is required';
    }

    if (req.body.quantity && !isNumber(req.body.quantity.trim())) {
      errors.quantity = 'quantity must be a number';
    }

    const isValid = isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }

  validateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name || validator.isEmpty(req.body.name.trim())) {
      errors.name = 'name field is required';
    }

    if (!req.body.desc || validator.isEmpty(req.body.desc.trim())) {
      errors.desc = 'description field is required';
    }

    if (!req.body.price.trim()) {
      errors.price = 'price field is required';
    }

    if (req.body.price && !isNumber(req.body.price.trim())) {
      errors.price = 'price must be a number';
    }

    if (!req.body.image || validator.isEmpty(req.body.image)) {
      errors.image = 'image is required';
    }

    const isValid = isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }

  validateUpdateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name && !req.body.extras && !req.body.price && !req.body.type) {
      errors.message = 'Enter a field to update';
    }

    if (req.body.name && validator.isEmpty(req.body.name.trim())) {
      errors.name = 'name is required';
    }

    if (req.body.desc && validator.isEmpty(req.body.desc.trim())) {
      errors.desc = 'description field is required';
    }

    if (req.body.price && validator.isEmpty(req.body.price.trim())) {
      errors.price = 'price field is required';
    }

    if (req.body.price && !isNumber(req.body.price.trim())) {
      errors.price = 'price must be a number';
    }

    if (req.body.image && validator.isEmpty(req.body.image)) {
      errors.image = 'image is required';
    }

    const isValid = isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }
}

const validateReq = new ValidateRequest();
export default validateReq;
