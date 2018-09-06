'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ordersStorage = require('../sampleData/ordersStorage');

var _ordersStorage2 = _interopRequireDefault(_ordersStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var router = _express2.default.Router();
router.use(_express2.default.json());

var OrdersControllers = function () {
  function OrdersControllers() {
    _classCallCheck(this, OrdersControllers);
  }

  _createClass(OrdersControllers, [{
    key: 'placeOrder',
    value: function placeOrder(req, res) {
      var order = {
        id: _ordersStorage2.default.length + 1,
        meal: req.body.meal,
        quantity: req.body.quantity,
        status: 'processing'
      };
      _ordersStorage2.default.push(order);
      return res.status(201).send(order);
    }
  }, {
    key: 'getOrders',
    value: function getOrders(req, res) {
      return res.send(_ordersStorage2.default);
    }
  }, {
    key: 'getOrder',
    value: function getOrder(req, res) {
      var order = _ordersStorage2.default.find(function (f) {
        return f.id === parseInt(req.params.id, 10);
      });
      if (!order) return res.status(404).send('order not found');
      return res.send(order);
    }
  }, {
    key: 'updateOrderStatus',
    value: function updateOrderStatus(req, res) {
      var order = _ordersStorage2.default.find(function (f) {
        return f.id === parseInt(req.params.id, 10);
      });
      if (!order) return res.status(404).json({ message: 'order not found' });

      order.status = req.body.status;
      return res.status(200).json(order);
    }
  }, {
    key: 'deleteOrder',
    value: function deleteOrder(req, res) {
      var order = _ordersStorage2.default.find(function (f) {
        return f.id === parseInt(req.params.id, 10);
      });
      if (!order) return res.status(404).json({ message: 'order not found' });

      var index = _ordersStorage2.default.indexOf();
      _ordersStorage2.default.splice(index, 1);
      return res.status(201).json({ message: 'order deleted successfully!' });
    }
  }]);

  return OrdersControllers;
}();

var ordersControllers = new OrdersControllers();
exports.default = ordersControllers;