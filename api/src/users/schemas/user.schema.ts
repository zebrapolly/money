import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

export const UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
});
