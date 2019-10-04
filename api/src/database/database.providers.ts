import * as mongoose from 'mongoose';

const {MONGO_URL, MONGO_PORT, MONGO_DB} = process.env;

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
  },
];
