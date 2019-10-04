import { Document } from 'mongoose';

export interface Currency extends Document {
  ID: string;
  NumCode: number;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: string;
  UpdatedAt: number;
}
