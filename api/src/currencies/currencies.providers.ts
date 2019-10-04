import { Connection } from 'mongoose';
import { CurrencySchema } from './schemas/currency.schema';

export const currencyProviders = [
  {
    provide: 'CURRENCY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Currency', CurrencySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
