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
}

const validateReq = new ValidateRequest();
export default validateReq;
