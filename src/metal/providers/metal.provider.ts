import { Connection } from 'mongoose';
import { MetalSchema } from '../schemas/gold.schema';

export const metalProvider = [
  {
    provide: 'METAL_MODEL',
    useFactory: (connection: Connection) => connection.model('Metal', MetalSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
