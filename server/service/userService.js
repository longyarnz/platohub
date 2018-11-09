'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserEmail = exports.checkIfUserExists = exports.authenticateUser = exports.createUser = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _logger = require('../middleware/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @fileoverview Methods for querying data from the users collection.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @exports { createUser, authenticateUser, checkIfUserExists, getUserEmail }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var HASH = parseInt(process.env.HASH);

/**
 * @description Authenticates a user given an email and a password
 * @param {object} credentials - email and password object
 * @return {object} isValid and id
 */
var authenticateUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(credentials) {
    var email, password, user, status;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            email = credentials.email, password = credentials.password;
            _context.next = 4;
            return _user2.default.findOne({ email: email }).select('password');

          case 4:
            user = _context.sent;

            if (!(user !== null && user.password)) {
              _context.next = 12;
              break;
            }

            _context.next = 8;
            return _bcrypt2.default.compareSync(password, user.password);

          case 8:
            status = _context.sent;
            return _context.abrupt('return', status ? { isValid: true, id: user._id } : { isValid: false, id: null });

          case 12:
            return _context.abrupt('return', { isValid: false, id: null });

          case 13:
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            _logger2.default.error(_context.t0);
            return _context.abrupt('return', _context.t0);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function authenticateUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @description Creates a user given a email and a password
 * @param {object} credentials - email and password object
 * @return {object} isValid and id
 */
var createUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(credentials) {
    var email, password, status, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            email = credentials.email, password = credentials.password;
            _context2.next = 4;
            return checkIfUserExists({ email: email });

          case 4:
            status = _context2.sent;

            if (!status) {
              _context2.next = 7;
              break;
            }

            throw 'User Already Exists';

          case 7:
            _context2.next = 9;
            return _bcrypt2.default.hashSync(password, HASH);

          case 9:
            password = _context2.sent;
            _context2.next = 12;
            return _user2.default.create({ email: email, password: password });

          case 12:
            user = _context2.sent;
            return _context2.abrupt('return', (typeof user === 'undefined' ? 'undefined' : _typeof(user)) === 'object' ? { isCreated: true, id: user._id } : { isCreated: false, id: null });

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](0);

            _logger2.default.error(_context2.t0);
            return _context2.abrupt('return', _context2.t0);

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 16]]);
  }));

  return function createUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var checkIfUserExists = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user2.default.findOne(query);

          case 3:
            user = _context3.sent;
            return _context3.abrupt('return', user === null ? false : true);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);

            _logger2.default.error(_context3.t0);
            return _context3.abrupt('return', _context3.t0);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function checkIfUserExists(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getUserEmail = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userId) {
    var _ref5, email;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _user2.default.findOne({ _id: userId }).select('email');

          case 3:
            _ref5 = _context4.sent;
            email = _ref5.email;
            return _context4.abrupt('return', email);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](0);

            _logger2.default.error(_context4.t0);
            return _context4.abrupt('return', _context4.t0);

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 8]]);
  }));

  return function getUserEmail(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createUser = createUser;
exports.authenticateUser = authenticateUser;
exports.checkIfUserExists = checkIfUserExists;
exports.getUserEmail = getUserEmail;