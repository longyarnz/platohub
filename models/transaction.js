/**
 * @fileoverview Creates a Tranaction schema for the database.
 * @exports mongoose.model
 */
import mongoose from '../connection/db';

const Schema = mongoose.Schema;

const Transaction = new Schema({
  type: String,
  amount: Number,
  newBalance: Number,
  wallet: String,
  account: String,
  user: String,
  date_created: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', Transaction);