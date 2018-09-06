'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mealsController = require('../controllers/mealsController');

var _mealsController2 = _interopRequireDefault(_mealsController);

var _validateRequests = require('../validations/validateRequests');

var _validateRequests2 = _interopRequireDefault(_validateRequests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(_express2.default.json());

router.post('/meals', _validateRequests2.default.validateMeal, _mealsController2.default.createMeal);

exports.default = router;