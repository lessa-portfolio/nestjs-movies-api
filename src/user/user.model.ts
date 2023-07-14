/* eslint-disable prettier/prettier */
import { Schema, Document, model, Model } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

export const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
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

// export const UserModel = model<User>('User', UserSchema);