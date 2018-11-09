/**
 * @fileoverview Methods for querying data from the transactions collection.
 * @exports { createTransaction, getATransactionWhere, getUserTransactions, deleteTransactionById }
 */
import { updateWalletAccountById } from './walletService';
import TransactionModel from '../models/transaction';
import logger from '../middleware/logger';

const createTransaction = async (type, amount, accountId, walletId) => {
  try {
    const account = await updateWalletAccountById(walletId, accountId, { balance: amount });
    if(account.balance === amount) {
      const transaction = await TransactionModel.create({ type, amount, account: accountId, wallet: walletId });
      return transaction;
    }
    else{
      throw new Error('Network Error: Transaction not completed');
    }
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const getATransactionWhere = async (query) => {
  try {
    const transaction = await TransactionModel.findOne(query);
    return transaction;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const getUserTransactions = async (created_by) => {
  try {
    const transactions = await TransactionModel.find({ created_by });
    return transactions;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const deleteTransactionById = async (transactionId) => {
  try {
    const remove = await TransactionModel.deleteOne({ _id: transactionId });
    return remove.ok === 1;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

export { createTransaction, getATransactionWhere, getUserTransactions, deleteTransactionById };