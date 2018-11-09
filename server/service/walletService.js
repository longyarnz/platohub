'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteWalletAccountById = exports.updateWalletAccountById = exports.getAccountBalance = exports.getAnAccountWhere = exports.updateWalletById = exports.deleteWalletById = exports.getUserWallets = exports.getAWalletWhere = exports.createWalletAccount = exports.createWallet = undefined;

var _wallet = require('../models/wallet');

var _wallet2 = _interopRequireDefault(_wallet);

var _logger = require('../middleware/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @fileoverview Methods for querying data from the wallets collection.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @exports { createWallet, getAWalletWhere, getUserWallets, deleteWalletById, updateWalletById, getAnAccountWhere, getAccountBalance, updateWalletAccountById, deleteWalletAccountById }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var createWallet = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId, label) {
    var wallet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _wallet2.default.create({ created_by: userId, label: label });

          case 3:
            wallet = _context.sent;
            return _context.abrupt('return', wallet);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            _logger2.default.error(_context.t0);
            return _context.abrupt('return', _context.t0);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function createWallet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createWalletAccount = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(walletId, type) {
    var update, wallet, account;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            update = { $push: { accounts: { type: type } } };
            _context2.next = 4;
            return updateWalletById(walletId, update, { new: true });

          case 4:
            wallet = _context2.sent;
            account = wallet.accounts[wallet.accounts.length - 1];
            return _context2.abrupt('return', account);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);

            _logger2.default.error(_context2.t0);
            return _context2.abrupt('return', _context2.t0);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 9]]);
  }));

  return function createWalletAccount(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getAWalletWhere = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
    var wallet;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _wallet2.default.findOne(query);

          case 3:
            wallet = _context3.sent;
            return _context3.abrupt('return', wallet);

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

  return function getAWalletWhere(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var getUserWallets = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(created_by) {
    var wallets;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _wallet2.default.find({ created_by: created_by });

          case 3:
            wallets = _context4.sent;
            return _context4.abrupt('return', wallets);

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

  return function getUserWallets(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

var updateWalletById = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(walletId, update) {
    var wallet;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _wallet2.default.findOneAndUpdate({ _id: walletId }, update, { new: true });

          case 3:
            wallet = _context5.sent;
            return _context5.abrupt('return', wallet);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](0);

            _logger2.default.error(_context5.t0);
            return _context5.abrupt('return', _context5.t0);

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function updateWalletById(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

var deleteWalletById = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(walletId) {
    var remove;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _wallet2.default.deleteOne({ _id: walletId });

          case 3:
            remove = _context6.sent;
            return _context6.abrupt('return', remove.ok === 1);

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6['catch'](0);

            _logger2.default.error(_context6.t0);
            return _context6.abrupt('return', _context6.t0);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function deleteWalletById(_x9) {
    return _ref6.apply(this, arguments);
  };
}();

var getAnAccountWhere = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(walletId, accountId) {
    var wallet, account;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return getAWalletWhere({ _id: walletId });

          case 3:
            wallet = _context7.sent;
            account = wallet.accounts.find(function (account) {
              return account._id === accountId;
            });

            if (!account) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt('return', account);

          case 9:
            throw new Error('Account does not exist');

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7['catch'](0);

            _logger2.default.error(_context7.t0);
            return _context7.abrupt('return', _context7.t0);

          case 16:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 12]]);
  }));

  return function getAnAccountWhere(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();

var getAccountBalance = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(walletId, accountId) {
    var account;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            account = getAnAccountWhere(walletId, accountId);
            return _context8.abrupt('return', account.balance);

          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8['catch'](0);

            _logger2.default.error(_context8.t0);
            return _context8.abrupt('return', _context8.t0);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 5]]);
  }));

  return function getAccountBalance(_x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

var updateWalletAccountById = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(walletId, accountId, update) {
    var wallet;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _wallet2.default.findOneAndUpdate({ _id: walletId, 'accounts._id': accountId }, {
              $set: { 'accounts.$': update }
            }, { new: true });

          case 3:
            wallet = _context9.sent;
            return _context9.abrupt('return', wallet.accounts.sort(function (a, b) {
              return b.date_created - a.date_created;
            })[0]);

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9['catch'](0);

            _logger2.default.error(_context9.t0);
            return _context9.abrupt('return', _context9.t0);

          case 11:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 7]]);
  }));

  return function updateWalletAccountById(_x14, _x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

var deleteWalletAccountById = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(walletId, accountId) {
    var wallet;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _wallet2.default.findOneAndUpdate({ _id: walletId }, { $pull: { accounts: { _id: accountId } } }, { new: true });

          case 3:
            wallet = _context10.sent;
            return _context10.abrupt('return', !wallet.accounts.some(function (account) {
              return account._id.toString() === accountId;
            }));

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10['catch'](0);

            _logger2.default.error(_context10.t0);
            return _context10.abrupt('return', _context10.t0);

          case 11:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[0, 7]]);
  }));

  return function deleteWalletAccountById(_x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}();

exports.createWallet = createWallet;
exports.createWalletAccount = createWalletAccount;
exports.getAWalletWhere = getAWalletWhere;
exports.getUserWallets = getUserWallets;
exports.deleteWalletById = deleteWalletById;
exports.updateWalletById = updateWalletById;
exports.getAnAccountWhere = getAnAccountWhere;
exports.getAccountBalance = getAccountBalance;
exports.updateWalletAccountById = updateWalletAccountById;
exports.deleteWalletAccountById = deleteWalletAccountById;