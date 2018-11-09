/**
 * @fileoverview Methods for querying data from the users collection.
 * @exports { createUser, authenticateUser, checkIfUserExists, getUserEmail }
 */
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
import logger from '../middleware/logger';

const HASH = parseInt(process.env.HASH);

/**
 * @description Authenticates a user given an email and a password
 * @param {object} credentials - email and password object
 * @return {object} isValid and id
 */
const authenticateUser = async (credentials) => {
  try {
    let { email, password } = credentials;
    const user = await UserModel.findOne({ email }).select('password');
    if(user !== null && user.password) {
      const status = await bcrypt.compareSync(password, user.password);
      return status ? { isValid: true, id: user._id } : { isValid: false, id: null };
    }
    else{
      return { isValid: false, id: null };
    }
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

/**
 * @description Creates a user given a email and a password
 * @param {object} credentials - email and password object
 * @return {object} isValid and id
 */
const createUser = async (credentials) => {
  try {
    let { email, password } = credentials;
    const status = await checkIfUserExists({ email });
    if(status) throw('User Already Exists');
    password = await bcrypt.hashSync(password, HASH);
    const user = await UserModel.create({ email, password });
    return typeof user === 'object' ? { isCreated: true, id: user._id } : { isCreated: false, id: null };
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const checkIfUserExists = async (query) => {
  try{
    const user = await UserModel.findOne(query);
    return user === null ? false : true;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

const getUserEmail =  async (userId) => {
  try{
    const { email } = await UserModel.findOne({_id: userId}).select('email');
    return email;
  }
  catch (err) {
    logger.error(err);
    return err;
  }
};

export { createUser, authenticateUser, checkIfUserExists, getUserEmail };