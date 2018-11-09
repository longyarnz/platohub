'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @fileoverview validateInput is a middleware that validates the email and password fields in the request object.
 * @exports validateInput
 */
exports.default = function (req, res, next) {
  /**
   * @description Destructures and extracts email and password from Request object
   */
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  /**
   * @description Tests for data input
   */

  if (!email || !password) {
    res.status(401).json({ message: 'Invalid Inputs' });
  }

  /**
   * @description Tests for data validity
   */
  else if (typeof email !== 'string' || typeof password !== 'string') {
      res.status(401).json({ message: 'Invalid Inputs' });
    } else {
      next();
    }
};