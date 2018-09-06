'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ordersController = require('../controllers/ordersController');

var _ordersController2 = _interopRequireDefault(_ordersController);

var _validateRequests = require('../validations/validateRequests');

var _validateRequests2 = _interopRequireDefault(_validateRequests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(_express2.default.json());

router.get('/orders', _ordersController2.default.getOrders);

router.post('/orders', _validateRequests2.default.validateOrders, _ordersController2.default.placeOrder);

exports.default = router;