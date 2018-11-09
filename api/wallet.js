/**
 * @fileoverview Wallet Routes and API endpoints.
 * @exports router
 */
import express from 'express';
import tokenParser from '../middleware/tokenParser';
import { 
  getUserWallets, createWallet, createWalletAccount, deleteWalletById, updateWalletById, getAccountBalance
} from '../service/walletService';
const router = express.Router();

/**
 * @description Gets all user wallets
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {Response} JSON
 */
router.get('/', tokenParser, async (req, res) => {
  try {
    const { userId } = req;
    const wallet = await getUserWallets(userId);
    res.status(200).json(wallet);
  }
  catch (err) {
    res.status(400).json('NetworkError: Unable to get user wallets');
  }
});

/**
 * @description Creates a single wallet
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A newly created wallet object
 */
router.post('/:label', tokenParser, async (req, res) => {
  try {
    const { params: { label }, userId } = req;
    const wallet = await createWallet(userId, label);
    res.status(200).json(wallet);
  }
  catch (err) {
    res.status(400).json('NetworkError: Unable to create a user wallet');
  }
});

/**
 * @description Updates a single user wallet
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A wallet object
 */
router.put('/:walletId', tokenParser, async (req, res) => {
  try {
    const {body, params: { walletId }} = req;
    const wallet = await updateWalletById(walletId, body);
    res.status(200).json(wallet);
  }
  catch (err) {
    res.status(400).json('NetworkError: Unable to update user wallet');
  }
});

/**
 * @description Deletes a single user wallet
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A wallet object
 */
router.delete('/:walletId', tokenParser, async (req, res) => {
  try {
    const { params: { walletId } } = req;
    const removed = await deleteWalletById(walletId);
    res.status(200).json(removed);
  }
  catch (err) {
    res.status(400).json('NetworkError: Unable to delete user wallet');
  }
});

/**
 * @description Fetch Wallet Balance
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A wallet object
 */
router.post('/:walletId/account/:type', tokenParser, async (req, res) => {
  try {
    const {params: { walletId, type }} = req;
    const balance = await createWalletAccount(walletId, type);
    res.status(200).json(balance);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

/**
 * @description Fetch Wallet Balance
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A wallet object
 */
router.get('/:walletId/:accountId/balance', tokenParser, async (req, res) => {
  try {
    const {params: { walletId, accountId }} = req;
    const balance = await getAccountBalance(walletId, accountId);
    res.status(200).json(balance);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

export default router;