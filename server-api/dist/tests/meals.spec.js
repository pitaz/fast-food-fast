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

var mealId = void 0;

(0, _mocha.describe)('Tests for meals API endpoints', function () {
  (0, _mocha.it)('should return error if api endpoint does not exist', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/meals/clo/abount').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(res.body.message).to.equal('page not found');
      done();
    });
  });

  (0, _mocha.it)('should add a meal', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/meals').set('Content-Type', 'application/json').send(_mock2.default.createMeal).end(function (err, res) {
      mealId = res.body.id;
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body.name).to.equal('Oha soup and pounded yam');
      done();
    });
  });
});