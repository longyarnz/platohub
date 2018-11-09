'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../api/auth');

var _userService = require('../service/userService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @fileoverview tokenParser is a middleware that extracts token bearer from the headers of a request. 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * The token is parsed and piped to the next callback.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @exports tokenParser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function (req, res, next) {
  var token = req.headers['authorization'];
  _jsonwebtoken2.default.verify(token, _auth.SERVER_KEY, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, decoded) {
      var userExists;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 4;
                break;
              }

              res.status(400).json({ message: 'Invalid User' });
              _context.next = 8;
              break;

            case 4:
              _context.next = 6;
              return (0, _userService.checkIfUserExists)({ _id: decoded.id });

            case 6:
              userExists = _context.sent;

              if (userExists) {
                req.userId = decoded.id;
                next();
              } else {
                res.status(400).json({ message: 'Invalid User' });
              }

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};