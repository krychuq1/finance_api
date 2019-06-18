import { Document } from 'mongoose';
import { Schema } from 'mongoose';

export interface IUser extends Document {
  readonly login: string;
  readonly password: string;
  readonly _id: Schema.Types.ObjectId;
}
