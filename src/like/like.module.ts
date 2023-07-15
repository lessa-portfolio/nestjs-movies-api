/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { DislikeController } from './dislike.controller';
import { UserSchema } from 'src/models/user.model';
import { MovieSchema } from 'src/models/movies.model';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  providers: [LikeService, JwtStrategy, AuthService, UserService, JwtService],
  controllers: [LikeController, DislikeController],
  exports: [LikeService],
})
export class LikeModule {}