/* eslint-disable class-methods-use-this eslint-disable-line no-use-before-define*/
import orders from '../sampleData/ordersStorage';
import meals from '../sampleData/mealsStorage';
import users from '../sampleData/usersStorage';
import obj from '../helpers/isEmpty';

class ValidateRequest {
  validateId(req, res, next) {
    if (isNaN(parseInt(req.params.id, 10))) {
      return res.status(400).send('Id is invalid');
    }

    return next();
  }

  checkMealId(req, res, next) {
    const meal = meals.find(f => f.id === parseInt(req.params.id, 10));
    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    return next();
  }

  checkLogin(req, res, next) {
    const user = users.find(f => f.email === req.body.email);
    if (!user) return res.status(404).json({ error: 'user not found' });

    return next();
  }

  checkOrderId(req, res, next) {
    const order = orders.find(f => f.id === parseInt(req.params.id, 10));
    if (!order) return res.status(404).json({ message: 'order not found' });

    return next();
  }

  validateOrders(req, res, next) {
    const errors = {};

    if (!req.body.meal) errors.meal = 'Enter a meal';

    if (!req.body.quantity) errors.quantity = 'Enter quantity';

    if (req.body.quantity) {
      if (isNaN(parseInt(req.body.quantity, 10))) {
        errors.quantity = 'quantity must be a number';
      }
    }

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }

  validateModifyOrders(req, res, next) {
    const errors = {};

    if (!req.body.meal && !req.body.quantity) errors.message = 'Enter a field to update';

    if (!req.body.meal) errors.meal = 'Meal is required';

    if (!req.body.quantity) errors.quantity = 'quantity is required';

    if (req.body.quantity) {
      if (isNaN(parseInt(req.body.quantity, 10))) {
        errors.quantity = 'quantity must be a number';
      }
    }

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }

  validateMeal(req, res, next) {
    const errors = {};

    if (!req.body.name) errors.name = 'name field is required';

    if (!req.body.desc) errors.desc = 'description field is required';

    if (!req.body.price) errors.price = 'price field is required';

    if (isNaN(parseInt(req.body.price, 10))) errors.price = 'price must be a number';

    if (!req.body.image) errors.image = 'image is required';

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
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

    return next();
  }

  validateNewUser(req, res, next) {
    const errors = {};

    if (!req.body.firstname) errors.firstname = 'firstname is required';

    if (!req.body.lastname) errors.lastname = 'lastname is required';

    if (!req.body.username) errors.username = 'username is required';

    if (!req.body.address) errors.address = 'address is required';

    if (!req.body.email) errors.email = 'Email is required';

    if (!req.body.password) errors.password = 'Password is required';

    if (req.body.password && req.body.password.length < 6) errors.password = 'Password must be greater than 6 characters';

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }

  validateLoginUser(req, res, next) {
    const errors = {};

    if (!req.body.email) errors.email = 'Email is required';

    if (!req.body.password) errors.password = 'Password is required';

    const isValid = obj.isEmpty(errors);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    return next();
  }
}

const validateReq = new ValidateRequest();
export default validateReq;
