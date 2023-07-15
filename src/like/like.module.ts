/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserSchema } from '../models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: UserSchema }]),
  ],
  providers: [LikeService],
  controllers: [LikeController],
  exports: [LikeService],
})
export class LikeModule {}