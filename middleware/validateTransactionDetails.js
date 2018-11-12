/**
 * @fileoverview validateTransactionDetails is a middleware that validates the amount, accountId, type and walletId fields in the request object.
 * @exports validateTransactionDetails
 */
export default (req, res, next) => {
  /**
   * @description Destructures and extracts email and password from Request object
   */
  const { amount, accountId, type, walletId } = req.body;

  /**
   * @description Tests for data input
   */
  if (!amount || !accountId || !type || !walletId) {
    res.status(401).json({ message: 'Invalid Inputs' });
  }

  /**
   * @description Tests for data validity
   */
  else if(type !== 'debit' && type !== 'credit'){
    console.log(type);
    res.status(401).json({ message: 'Invalid transaction type' });
  }

  else if(typeof amount !== 'number'){
    res.status(401).json({ message: 'Invalid amount type' });
  }

  else {
    next();
  }
};