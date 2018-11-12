/**
 * @fileoverview Methods for querying data from the wallets collection.
 * @exports { createWallet, createWalletAccount, getAWalletWhere, getUserWallets, deleteWalletById, updateWalletById, getWalletAccounts, getAnAccountWhere, getAccountBalance, deleteWalletAccountById, updateAccountBalance }
 */
import WalletModel from '../models/wallet';

const createWallet = async (userId, name) => {
  try {
    const wallet = await WalletModel.create({ created_by: userId, name });
    return wallet;
  }
  catch (err) {
    throw err;
  }
};

const createWalletAccount = async (walletId, type, label) => {
  try {
    const update = { $push: { accounts: { type, label } } };
    const wallet = await updateWalletById(walletId, update, {new: true});
    const account = wallet.accounts[wallet.accounts.length - 1];
    return account;
  }
  catch (err) {
    throw err;
  }
}

const getAWalletWhere = async (query) => {
  try {
    const wallet = await WalletModel.findOne(query);
    return wallet;
  }
  catch (err) {
    throw err;
  }
};

const getUserWallets = async (created_by) => {
  try {
    const wallets = await WalletModel.find({ created_by });
    return wallets;
  }
  catch (err) {
    throw err;
  }
};

const updateWalletById = async (walletId, update) => {
  try {
    const wallet = await WalletModel.findOneAndUpdate({ _id: walletId }, update, { new: true });
    return wallet;
  }
  catch (err) {
    throw err;
  }
};

const deleteWalletById = async (walletId) => {
  try {
    const remove = await WalletModel.deleteOne({ _id: walletId });
    return remove.ok === 1;
  }
  catch (err) {
    throw err;
  }
};

const getAnAccountWhere = async (walletId, accountId) => {
  try {
    const wallet = await getAWalletWhere({_id: walletId});
    const account = wallet && wallet.accounts.find(account => account._id.toString() === accountId);
    if(account) {
      return account;
    }
    else{
      throw new Error('Account does not exist');
    }
  }
  catch (err) {
    throw err;
  }
};

const getWalletAccounts = async (walletId) => {
  try {
    const wallet = await getAWalletWhere({_id: walletId});
    const { accounts } = wallet.accounts && wallet.accounts.length > 0 ? wallet : {accounts: []};
    return accounts;
  }
  catch (err) {
    throw err;
  }
};

const getAccountBalance = async (walletId, accountId) => {
  try {
    const account = await getAnAccountWhere(walletId, accountId);
    if(!account) throw new Error('Account does not exist');
    return account.balance;
  }
  catch (err) {
    throw err;
  }
};

const updateWalletAccountById = async (walletId, accountId, update) => {
  try {
    const wallet = await WalletModel.findOneAndUpdate({ _id: walletId, 'accounts._id': accountId }, {
      $set: { 'accounts.$': update }
    }, {new: true});
    const updatedAccount = wallet.accounts.find(account => account._id.toString() === accountId);
    return updatedAccount;
  }
  catch (err) {
    throw err;
  }
};

const updateAccountBalance = async (walletId, accountId, balance) => {
  try {
    const account = await getAnAccountWhere(walletId, accountId);
    account.balance = balance;
    const updatedAccount = await updateWalletAccountById(walletId, accountId, account);
    return updatedAccount;
  }
  catch (err) {
    throw err;
  }
};

const deleteWalletAccountById = async (walletId, accountId) => {
  try {
    const wallet = await WalletModel.findOneAndUpdate({_id: walletId}, {$pull: {accounts: {_id: accountId}}}, {new: true});
    return !wallet.accounts.some(account => account._id.toString() === accountId);
  }
  catch (err) {
    throw err;
  }
};

export { createWallet, createWalletAccount, getAWalletWhere, getUserWallets, deleteWalletById, updateWalletById, getWalletAccounts, getAnAccountWhere, getAccountBalance, deleteWalletAccountById, updateAccountBalance };