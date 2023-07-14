/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<User>) {}

  async createUser(userData: User): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }
}
