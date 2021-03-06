/**
 * @fileoverview Transaction Routes and API endpoints.
 * @exports router
 */
import express from 'express';
import logger from '../middleware/logger';
import tokenParser from '../middleware/tokenParser';
import validateTransactionDetails from '../middleware/validateTransactionDetails';
import {
  getUserTransactions, createTransaction, deleteTransactionById, getATransactionWhere
} from '../service/transactionService';
const router = express.Router();

/**
 * @description Gets all user transactions
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {Response} JSON
 */
router.get('/', tokenParser, async (req, res) => {
  try {
    const { userId } = req;
    const transaction = await getUserTransactions(userId);
    res.status(200).json(transaction);
  }
  catch (err) {
    logger.error(err); res.status(400).json('NetworkError: Unable to get user transactions');
  }
});

/**
 * @description Creates a single transaction
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A newly created transaction object
 */
router.post('/', validateTransactionDetails, tokenParser, async (req, res) => {
  try {
    const { body: { amount, accountId, type, walletId }, userId } = req;
    // eslint-disable-next-line no-unused-vars
    const transaction = await createTransaction(type, amount, accountId, walletId, userId);
    res.status(200).json(transaction);
  }
  catch (err) {
    logger.error(err); res.status(400).json('NetworkError: Unable to create a user transaction');
  }
});

/**
 * @description Gets a single user transaction
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A transaction object
 */
router.get('/:transactionId', tokenParser, async (req, res) => {
  try {
    const { params: { transactionId } } = req;
    const transaction = await getATransactionWhere({ _id: transactionId });
    res.status(200).json(transaction);
  }
  catch (err) {
    logger.error(err); res.status(400).json('NetworkError: Unable to get user transaction');
  }
});

/**
 * @description Deletes a single user transaction
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {object} A transaction object
 */
router.delete('/:transactionId', tokenParser, async (req, res) => {
  try {
    const { params: { transactionId } } = req;
    const removed = await deleteTransactionById(transactionId);
    res.status(200).json(removed);
  }
  catch (err) {
    logger.error(err); res.status(400).json('NetworkError: Unable to delete user transaction');
  }
});

export default router;