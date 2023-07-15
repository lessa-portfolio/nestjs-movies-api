/* eslint-disable prettier/prettier */
import { Schema, model, Model } from 'mongoose';

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  movies: string[];
}

export const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
});

export interface UserModel extends Model<User> {
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
}

UserSchema.statics.findUserById = function (id: string) {
  return this.findById(id).exec();
};

UserSchema.statics.findUserByEmail = function (email: string) {
  return this.findOne({ email }).exec();
};

export const UserModel = model<User, UserModel>('User', UserSchema);