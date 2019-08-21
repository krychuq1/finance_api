import { Schema } from 'mongoose';

export interface IMetal {
  oz: number;
  type: string;
  userId: Schema.Types.ObjectId;
}
