/**
 * @fileoverview Methods for querying data from the transactions collection.
 * @exports { createTransaction, getATransactionWhere, getUserTransactions, deleteTransactionById }
 */
import { getAccountBalance, updateAccountBalance } from './walletService';
import TransactionModel from '../models/transaction';

const createTransaction = async (type, amount, accountId, walletId, userId) => {
  try {
    const balance = await getAccountBalance(walletId, accountId);
    const newBalance = type === 'credit' ? balance + amount : balance - amount;
    const account = await updateAccountBalance(walletId, accountId, newBalance);

    if(account.balance === newBalance) {
      const transaction = await TransactionModel.create({ type, amount, newBalance, account: accountId, wallet: walletId, user: userId });
      return transaction;
    }

    else{
      throw new Error('Network Error: Transaction not completed');
    }
  }
  catch (err) {
    throw err;
  }
};

const getATransactionWhere = async (query) => {
  try {
    const transaction = await TransactionModel.findOne(query);
    return transaction;
  }
  catch (err) {
    throw err;
  }
};

const getUserTransactions = async (created_by) => {
  try {
    const transactions = await TransactionModel.find({ created_by });
    return transactions;
  }
  catch (err) {
    throw err;
  }
};

const deleteTransactionById = async (transactionId) => {
  try {
    const remove = await TransactionModel.deleteOne({ _id: transactionId });
    return remove.ok === 1;
  }
  catch (err) {
    throw err;
  }
};

export { createTransaction, getATransactionWhere, getUserTransactions, deleteTransactionById };