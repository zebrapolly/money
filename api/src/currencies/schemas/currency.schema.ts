import * as mongoose from 'mongoose';

export const CurrencySchema = new mongoose.Schema({
  ID: String,
  NumCode: String,
  CharCode: String,
  Nominal: String,
  Name: String,
  Value: String,
  UpdatedAt: Number,
});
