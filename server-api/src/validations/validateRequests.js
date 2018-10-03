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

  // checkLogin(req, res, next) {
  //   const user = users.find(f => f.email === req.body.email);
  //   if (!user) return res.status(404).json({ error: 'user not found' });

  //   next();
  // }

  checkOrderId(req, res, next) {
    const order = orders.find(f => f.id === parseInt(req.params.id, 10));
    if (!order) return res.status(404).json({ message: 'order not found' });

    next();
  }

  validateOrders(req, res, next) {
    const errors = {};

    if (!req.body.meal) errors.meal = 'Enter a meal';

    if (!req.body.quantity) errors.quantity = 'Enter quantity';

    if (req.body.quantity) {
      if (isNaN(req.body.quantity)) {
        errors.quantity = 'quantity must be a number';
      }
    }

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateModifyOrders(req, res, next) {
    const errors = {};

    if (!req.body.meal && !req.body.quantity) errors.message = 'Enter a field to update';

    if (!req.body.meal) errors.meal = 'Meal is required';

    if (!req.body.quantity) errors.quantity = 'quantity is required';

    if (req.body.quantity) {
      if (isNaN(req.body.quantity)) {
        errors.quantity = 'quantity must be a number';
      }
    }

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name) errors.name = 'name field is required';

    if (!req.body.desc) errors.desc = 'description field is required';

    if (!req.body.price) errors.price = 'price field is required';

    if (isNaN(req.body.price)) errors.price = 'price must be a number';

    if (!req.body.image) errors.image = 'image is required';

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateUpdateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name) errors.name = 'name is required';

    if (!req.body.desc) errors.desc = 'description field is required';

    if (!req.body.price) errors.price = 'price field is required';

    if (!req.body.price) errors.price = 'price must be a number';

    if (!req.body.image) errors.image = 'image is required';

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateNewUser(req, res, next) {
    const errors = {};

    if (!req.body.name) errors.name = 'name is required';

    if (!req.body.email) errors.email = 'email is required';

    if (!req.body.role) errors.role = 'role is required';

    if (!req.body.password) errors.password = 'password is required';

    if (!req.body.email) errors.email = 'email is required';

    if (req.body.email && !checkEmail.validateEmail(req.body.email)) {
      errors.email = 'Email is invalid';
    }

    // if (!req.body.password) errors.password = 'Password is required';

    if (req.body.password && req.body.password.length < 6) errors.password = 'Password must be greater than 6 characters';

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    next();
  }

  validateLoginUser(req, res, next) {
    const errors = {};

    if (!req.body.email) errors.email = 'Email is required';

    if (req.body.email && !checkEmail.validateEmail(req.body.email)) errors.email = 'Email is invalid';

    if (!req.body.password) errors.password = 'Password is required';
    if (req.body.password && req.body.password.length < 6) errors.password = 'Password must be greater than 6 characters';

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    next();
  }
}

const validateReq = new ValidateRequest();
export default validateReq;
