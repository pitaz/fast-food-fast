'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isNumber = require('is-number');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidateRequest = function () {
  function ValidateRequest() {
    _classCallCheck(this, ValidateRequest);
  }

  _createClass(ValidateRequest, [{
    key: 'validateId',
    value: function validateId(req, res, next) {
      if (!(0, _isNumber2.default)(req.params.id)) {
        return res.status(400).send('Id is invalid');
      }

      return next();
    }
  }, {
    key: 'validateOrders',
    value: function validateOrders(req, res, next) {
      var errors = {};

      if (!req.body.meal || _validator2.default.isEmpty(req.body.meal.trim())) {
        errors.meal = 'Enter a meal';
      }

      if (!req.body.quantity || _validator2.default.isEmpty(req.body.quantity.trim())) {
        errors.quantity = 'Enter quantity';
      }

      if (req.body.quantity) {
        if (!(0, _isNumber2.default)(req.body.quantity.trim())) {
          errors.quantity = 'quantity must be a number';
        }
      }

      var isValid = (0, _isEmpty2.default)(errors);

      if (!isValid) {
        return res.status(400).json({ error: errors });
      }

      return next();
    }
  }]);

  return ValidateRequest;
}();

var validateReq = new ValidateRequest();
exports.default = validateReq;