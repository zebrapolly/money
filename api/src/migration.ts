import * as mongoose from 'mongoose';
import { UserSchema } from './users/schemas/user.schema';

const {MONGO_URL, MONGO_PORT, MONGO_DB} = process.env;

async function migrate() {
  console.log('Start migrating');
  const connection = await mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const User = mongoose.model('User', UserSchema);
    await User.updateOne(
      {username: 'test'},
      {$set: {username: 'test', password: 'test'}},
      {upsert: true},
    );
  } catch (err) {
    console.log('Migrating failed', err);
  } finally {
    console.log('Migrating finished');
    await connection.disconnect();
  }
}

migrate();
