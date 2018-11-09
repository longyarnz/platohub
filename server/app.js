'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _auth = require('./api/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./api/user');

var _user2 = _interopRequireDefault(_user);

var _wallet = require('./api/wallet');

var _wallet2 = _interopRequireDefault(_wallet);

var _transaction = require('./api/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @constant {number} PORT
 */
var PORT = process.env.PORT;

/**
 * @constant {number} HOST
 */
/**
 * @fileoverview Server configuration and API endpoints.
 * @exports app
 */
var HOST = process.env.HOST;

/**
 * @description Creates an express application
 * @constant {object}
 */
var app = (0, _express2.default)();

/**
 * @description Add middleware for parsing request body to text, json, url object or form data
 * @function EXPRESS_USE_MIDDLEWARE
 * @param {middleware} body-parser A middleware for parsing request body to functional data type
 */
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static('build'));

/**
 * @description Create server Routes
 */
app.use('/auth', _auth2.default);
app.use('/user', _user2.default);
app.use('/wallet', _wallet2.default);
app.use('/transaction', _transaction2.default);

/**
 * @description Test server connection
 */
app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var response = JSON.stringify({
    status: 200,
    message: 'Server Status - OK'
  });
  res.send(response);
});

/**
 * @description Let express application listen on dedicated PORT
 */
// eslint-disable-next-line
app.listen(PORT, HOST, function () {
  return console.log('Server listening on http://' + HOST + ':' + PORT);
});

exports.default = app;