/**
 * @fileoverview Methods for querying data from the wallets collection.
 * @exports { createWallet, getAWalletWhere, getUserWallets, deleteWalletById, updateWalletById, getAnAccountWhere, getAccountBalance, updateWalletAccountById, deleteWalletAccountById }
 */
import WalletModel from '../models/wallet';
import logger from '../middleware/logger';

const createWallet = async (userId, label) => {
  try {
    const wallet = await WalletModel.create({ created_by: userId, label });
    return wallet;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const createWalletAccount = async (walletId, type) => {
  try {
    const update = { $push: { accounts: { type } } };
    const wallet = await updateWalletById(walletId, update, {new: true});
    const account = wallet.accounts[wallet.accounts.length - 1];
    return account;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
}

const getAWalletWhere = async (query) => {
  try {
    const wallet = await WalletModel.findOne(query);
    return wallet;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const getUserWallets = async (created_by) => {
  try {
    const wallets = await WalletModel.find({ created_by });
    return wallets;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const updateWalletById = async (walletId, update) => {
  try {
    const wallet = await WalletModel.findOneAndUpdate({ _id: walletId }, update, { new: true });
    return wallet;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const deleteWalletById = async (walletId) => {
  try {
    const remove = await WalletModel.deleteOne({ _id: walletId });
    return remove.ok === 1;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const getAnAccountWhere = async (walletId, accountId) => {
  try {
    const wallet = await getAWalletWhere({_id: walletId});
    const account = wallet.accounts.find(account => account._id === accountId);
    if(account) {
      return account;
    }
    else{
      throw new Error('Account does not exist');
    }
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const getAccountBalance = async (walletId, accountId) => {
  try {
    const account = getAnAccountWhere(walletId, accountId);
    return account.balance;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const updateWalletAccountById = async (walletId, accountId, update) => {
  try {
    const wallet = await WalletModel.findOneAndUpdate({ _id: walletId, 'accounts._id': accountId }, {
      $set: { 'accounts.$': update }
    }, {new: true});
    return wallet.accounts.sort((a, b) => b.date_created - a.date_created)[0];
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const deleteWalletAccountById = async (walletId, accountId) => {
  try {
    const wallet = await WalletModel.findOneAndUpdate({_id: walletId}, {$pull: {accounts: {_id: accountId}}}, {new: true});
    return !wallet.accounts.some(account => account._id.toString() === accountId);
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

export { createWallet, createWalletAccount, getAWalletWhere, getUserWallets, deleteWalletById, updateWalletById, getAnAccountWhere, getAccountBalance, updateWalletAccountById, deleteWalletAccountById };