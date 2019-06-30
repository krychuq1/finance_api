import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
export const UserSchema = new mongoose.Schema({
  login: {type: String, required: true},
  password: {type: String, required: true},
  metals: [
    {type: Schema.Types.ObjectId, ref: 'Metal'},
  ],
});
