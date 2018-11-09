'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../connection/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema; /**
                                   * @fileoverview Creates a Wallet schema for the database.
                                   * @exports mongoose.model
                                   */


var Wallet = new Schema({
  label: { type: String, default: 'New Wallet' },
  accounts: [{
    type: { type: String, default: 'debit' },
    balance: { type: Number, default: 0 }
  }],
  date_created: { type: Date, default: Date.now },
  created_by: { type: String, ref: 'User' }
});

exports.default = _db2.default.model('Wallet', Wallet);