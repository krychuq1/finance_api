import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
export const MetalSchema = new mongoose.Schema({
  oz: {type: Number, required: true},
  user: {type: Schema.Types.ObjectId, require: true},
  type: {type: String, require: true},
});
