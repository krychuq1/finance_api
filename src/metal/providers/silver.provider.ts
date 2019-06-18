import { Connection } from 'mongoose';
import { SilverSchema } from '../schemas/silver.schema';

export const silverProvider = [
  {
    provide: 'SILVER_MODEL',
    useFactory: (connection: Connection) => connection.model('Silver', SilverSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
