/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(userData: User): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findUserById(id: string): Promise<User> {
    return UserModel.findById(id).exec();
  }

  async findUserByEmail(email: string): Promise<User> {
    return UserModel.findOne({ email }).exec();
  }
}
