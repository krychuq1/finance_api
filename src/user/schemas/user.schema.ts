import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  login: {type: String, required: true},
  password: {type: String, required: true},
});
