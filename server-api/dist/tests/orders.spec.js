'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _mock = require('./helper/mock');

var _mock2 = _interopRequireDefault(_mock);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var orderId = void 0;

(0, _mocha.describe)('Tests for Orders API endpoints', function () {
  (0, _mocha.it)('should place an order', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/orders').set('Content-Type', 'application/json').send(_mock2.default.placeOrder).end(function (err, res) {
      orderId = res.body.id;
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body.meal).to.equal('Jollof Rice with grilled chicken');
      done();
    });
  });

  (0, _mocha.it)('should return errors if fields to place an order are not filled', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/orders/').set('Content-Type', 'application/json').send({
      meal: '',
      quantity: ''
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body.error.meal).to.equal('Enter a meal');
      done();
    });
  });
});