/**
 * @fileoverview Creates a Tranaction schema for the database.
 * @exports mongoose.model
 */
import mongoose from '../connection/db';

const Schema = mongoose.Schema;

const Transaction = new Schema({
  type: String,
  amount: Number,
  wallet: String,
  account: Number,
  date_created: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', Transaction);