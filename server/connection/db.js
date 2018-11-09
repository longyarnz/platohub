'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _dotenv = require('dotenv');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

/**
 * @description Creates a connection to the MongoDB server
 */
/**
 * @fileoverview MongoDB Database configuration.
 * @exports mongoose
 */
_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(process.env.MONGODB, { useNewUrlParser: true });

exports.default = _mongoose2.default;