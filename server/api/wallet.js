'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _tokenParser = require('../middleware/tokenParser');

var _tokenParser2 = _interopRequireDefault(_tokenParser);

var _walletService = require('../service/walletService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @fileoverview Wallet Routes and API endpoints.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @exports router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var router = _express2.default.Router();

/**
 * @description Gets all user wallets
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {Response} JSON
 */
router.get('/', _tokenParser2.default, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userId, wallet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = req.userId;
            _context.next = 4;
            return (0, _walletService.getUserWallets)(userId);

          case 4:
            wallet = _context.sent;

            res.status(200).json(wallet);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            res.status(400).json('NetworkError: Unable to get user wallets');

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
 * @description Creates a single wallet
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A newly created wallet object
 */
router.post('/:label', _tokenParser2.default, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var label, userId, wallet;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            label = req.params.label, userId = req.userId;
            _context2.next = 4;
            return (0, _walletService.createWallet)(userId, label);

          case 4:
            wallet = _context2.sent;

            res.status(200).json(wallet);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);

            res.status(400).json('NetworkError: Unable to create a user wallet');

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
 * @description Updates a single user wallet
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A wallet object
 */
router.put('/:walletId', _tokenParser2.default, function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var body, walletId, wallet;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            body = req.body, walletId = req.params.walletId;
            _context3.next = 4;
            return (0, _walletService.updateWalletById)(walletId, body);

          case 4:
            wallet = _context3.sent;

            res.status(200).json(wallet);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);

            res.status(400).json('NetworkError: Unable to update user wallet');

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
 * @description Deletes a single user wallet
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A wallet object
 */
router.delete('/:walletId', _tokenParser2.default, function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var walletId, removed;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            walletId = req.params.walletId;
            _context4.next = 4;
            return (0, _walletService.deleteWalletById)(walletId);

          case 4:
            removed = _context4.sent;

            res.status(200).json(removed);
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](0);

            res.status(400).json('NetworkError: Unable to delete user wallet');

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

/**
 * @description Fetch Wallet Balance
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A wallet object
 */
router.post('/:walletId/account/:type', _tokenParser2.default, function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$params, walletId, type, balance;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$params = req.params, walletId = _req$params.walletId, type = _req$params.type;
            _context5.next = 4;
            return (0, _walletService.createWalletAccount)(walletId, type);

          case 4:
            balance = _context5.sent;

            res.status(200).json(balance);
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5['catch'](0);

            res.status(400).json(_context5.t0);

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 8]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

/**
 * @description Fetch Wallet Balance
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A wallet object
 */
router.get('/:walletId/:accountId/balance', _tokenParser2.default, function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$params2, walletId, accountId, balance;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$params2 = req.params, walletId = _req$params2.walletId, accountId = _req$params2.accountId;
            _context6.next = 4;
            return (0, _walletService.getAccountBalance)(walletId, accountId);

          case 4:
            balance = _context6.sent;

            res.status(200).json(balance);
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](0);

            res.status(400).json(_context6.t0);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 8]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

exports.default = router;