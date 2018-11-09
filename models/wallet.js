/**
 * @fileoverview Creates a Wallet schema for the database.
 * @exports mongoose.model
 */
import mongoose from '../connection/db';

const Schema = mongoose.Schema;

const Wallet = new Schema({
  label: { type: String, default: 'New Wallet' },
  accounts: [
    {
      type: { type: String, default: 'debit' },
      balance: { type: Number, default: 0 }
    }
  ],
  date_created: { type: Date, default: Date.now },
  created_by: { type: String, ref: 'User' }
});

export default mongoose.model('Wallet', Wallet);