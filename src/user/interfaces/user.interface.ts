import { Document } from 'mongoose';
import { Schema } from 'mongoose';
import { IMetal } from '../../metal/interfaces/IMetal';

export interface IUser extends Document {
  readonly login: string;
  readonly password: string;
  readonly _id: Schema.Types.ObjectId;
  readonly metals: IMetal[];
  save();
}
