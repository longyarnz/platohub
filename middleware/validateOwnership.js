import { getUserWallets } from '../service/walletService';

/**
 * @fileoverview validateInput is a middleware that validates the name field in the request object.
 * @exports validateBucket
 */
export default async (req, res, next) => {
  const { userId, params: { walletId } } = req;
  
  const wallets = await getUserWallets(userId);
  
  const userOwnsWallet = wallets.some(wallet => wallet._id.toString() === walletId);

  if (userOwnsWallet) {
    next();
  }

  else {
    res.status(401).json({ Error: 'User does not own wallet' });
  }
};