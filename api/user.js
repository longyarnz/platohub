/**
 * @fileoverview Wallet Routes and API endpoints.
 * @exports router
 */
import express from 'express';
import tokenParser from '../middleware/tokenParser';
import { 
  getUserFriends, addFriends, removeFriends
} from '../service/userService';
const router = express.Router();

/**
 * @description Gets all user wallets
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {Response} JSON
 */
router.get('/friends', tokenParser, async (req, res) => {
  try {
    const { userId } = req;
    const user = await getUserFriends(userId);
    res.status(200).json(user);
  }
  catch (err) {
    res.status(400).json('NetworkError: Unable to get user wallets');
  }
});

/**
 * @description Gets all user wallets
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {Response} JSON
 */
router.put('/friends/:friend', tokenParser, async (req, res) => {
  try {
    let { params: { friend }, userId } = req;
    const wallet = await addFriends(userId, friend);
    res.status(200).json(wallet);
  }
  catch (err) {
    res.status(400).json('NetworkError: Unable to get user wallets');
  }
});

/**
 * @description Gets all user wallets
 * @param {middleware} tokenParser - Extracts userId from token
 * @returns {Response} JSON
 */
router.delete('/friends/:friend', tokenParser, async (req, res) => {
  try {
    let { params: { friend }, userId } = req;
    const wallet = await removeFriends(userId, friend);
    res.status(200).json(wallet);
  }
  catch (err) {
    res.status(400).json('NetworkError: Unable to get user wallets');
  }
});

export default router;