'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable  */
var app = (0, _express2.default)();

app.get('/', function (req, res) {
  res.send('<h1>Welcome to Fast Food Fast!</h1>');
});

app.use(_routes2.default);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log('Listening on port ' + port + '...');
});

exports.default = app;