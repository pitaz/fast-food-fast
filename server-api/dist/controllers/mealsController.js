'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mealsStorage = require('../sampleData/mealsStorage');

var _mealsStorage2 = _interopRequireDefault(_mealsStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var router = _express2.default.Router();
router.use(_express2.default.json());

var MealsControllers = function () {
  function MealsControllers() {
    _classCallCheck(this, MealsControllers);
  }

  _createClass(MealsControllers, [{
    key: 'createMeal',
    value: function createMeal(req, res) {
      if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
      }
      var meal = {
        id: _mealsStorage2.default.length + 1,
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        image: req.body.image
      };
      _mealsStorage2.default.push(meal);
      return res.status(201).send(meal);
    }
  }]);

  return MealsControllers;
}();

var mealsControllers = new MealsControllers();
exports.default = mealsControllers;