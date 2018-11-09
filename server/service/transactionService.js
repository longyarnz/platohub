'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTransactionById = exports.getUserTransactions = exports.getATransactionWhere = exports.createTransaction = undefined;

var _walletService = require('./walletService');

var _transaction = require('../models/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _logger = require('../middleware/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @fileoverview Methods for querying data from the transactions collection.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @exports { createTransaction, getATransactionWhere, getUserTransactions, deleteTransactionById }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var createTransaction = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type, amount, accountId, walletId) {
    var account, transaction;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _walletService.updateWalletAccountById)(walletId, accountId, { balance: amount });

          case 3:
            account = _context.sent;

            if (!(account.balance === amount)) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return _transaction2.default.create({ type: type, amount: amount, account: accountId, wallet: walletId });

          case 7:
            transaction = _context.sent;
            return _context.abrupt('return', transaction);

          case 11:
            throw new Error('Network Error: Transaction not completed');

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);

            _logger2.default.error(_context.t0);
            return _context.abrupt('return', _context.t0);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 14]]);
  }));

  return function createTransaction(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var getATransactionWhere = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
    var transaction;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _transaction2.default.findOne(query);

          case 3:
            transaction = _context2.sent;
            return _context2.abrupt('return', transaction);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            _logger2.default.error(_context2.t0);
            return _context2.abrupt('return', _context2.t0);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getATransactionWhere(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getUserTransactions = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(created_by) {
    var transactions;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _transaction2.default.find({ created_by: created_by });

          case 3:
            transactions = _context3.sent;
            return _context3.abrupt('return', transactions);

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

  return function getUserTransactions(_x6) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteTransactionById = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(transactionId) {
    var remove;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _transaction2.default.deleteOne({ _id: transactionId });

          case 3:
            remove = _context4.sent;
            return _context4.abrupt('return', remove.ok === 1);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](0);

            _logger2.default.error(_context4.t0);
            return _context4.abrupt('return', _context4.t0);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function deleteTransactionById(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createTransaction = createTransaction;
exports.getATransactionWhere = getATransactionWhere;
exports.getUserTransactions = getUserTransactions;
exports.deleteTransactionById = deleteTransactionById;