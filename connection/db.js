/**
 * @fileoverview MongoDB Database configuration.
 * @exports mongoose
 */
import mongoose from 'mongoose';
import promise from 'bluebird';
import { config } from 'dotenv';

config();

/**
 * @description Creates a connection to the MongoDB server
 */
mongoose.Promise = promise;
// mongodb://127.0.0.1:27017/bucketdb
// mongodb+srv://lekan:forntenddeveloper@cluster0-dydyx.mongodb.net/bucket?retryWrites=true
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });

export default mongoose;