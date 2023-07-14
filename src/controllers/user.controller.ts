/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: User): Promise<User> {
    const newUser = await this.userService.createUser(userData);
    return newUser;
  }
}