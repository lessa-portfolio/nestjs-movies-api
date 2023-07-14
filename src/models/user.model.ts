/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

export const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>('User', UserSchema);