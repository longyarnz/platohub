'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _tokenParser = require('../middleware/tokenParser');

var _tokenParser2 = _interopRequireDefault(_tokenParser);

var _transactionService = require('../service/transactionService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @fileoverview Transaction Routes and API endpoints.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @exports router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var router = _express2.default.Router();

/**
 * @description Gets all user transactions
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {Response} JSON
 */
router.get('/', _tokenParser2.default, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userId, transaction;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = req.userId;
            _context.next = 4;
            return (0, _transactionService.getUserTransactions)(userId);

          case 4:
            transaction = _context.sent;

            res.status(200).json(transaction);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            res.status(400).json('NetworkError: Unable to get user transactions');

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * @description Creates a single transaction
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A newly created transaction object
 */
router.post('/', _tokenParser2.default, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, amount, accountId, type, walletId, transaction;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, amount = _req$body.amount, accountId = _req$body.accountId, type = _req$body.type, walletId = _req$body.walletId;
            _context2.next = 4;
            return (0, _transactionService.createTransaction)(type, amount, accountId, walletId);

          case 4:
            transaction = _context2.sent;

            res.status(200).json(transaction);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);

            res.status(400).json('NetworkError: Unable to create a user transaction');

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * @description Gets a single user transaction
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A transaction object
 */
router.get('/:transactionId', _tokenParser2.default, function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var transactionId, transaction;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            transactionId = req.params.transactionId;
            _context3.next = 4;
            return (0, _transactionService.getATransactionWhere)({ _id: transactionId });

          case 4:
            transaction = _context3.sent;

            res.status(200).json(transaction);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);

            res.status(400).json('NetworkError: Unable to get user transaction');

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * @description Deletes a single user transaction
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A transaction object
 */
router.delete('/:transactionId', _tokenParser2.default, function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var transactionId, removed;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            transactionId = req.params.transactionId;
            _context4.next = 4;
            return (0, _transactionService.deleteTransactionById)(transactionId);

          case 4:
            removed = _context4.sent;

            res.status(200).json(removed);
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](0);

            res.status(400).json('NetworkError: Unable to delete user transaction');

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 8]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

exports.default = router;