import { Schema } from 'mongoose';
export interface JwtPayload {
  login: string;
  userId: Schema.Types.ObjectId;
}
