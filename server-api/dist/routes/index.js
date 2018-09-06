'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _orders = require('./orders');

var _orders2 = _interopRequireDefault(_orders);

var _meals = require('./meals');

var _meals2 = _interopRequireDefault(_meals);

var _routeNotFound = require('./routeNotFound');

var _routeNotFound2 = _interopRequireDefault(_routeNotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/api/v1', _orders2.default);
router.use('/api/v1', _meals2.default);
router.use('/', _routeNotFound2.default);

exports.default = router;