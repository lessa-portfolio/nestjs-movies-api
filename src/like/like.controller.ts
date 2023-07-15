/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Request } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly jwtStrategy: JwtStrategy
  ) {}

  @Post()
  async addLike(@Request() request: any, @Body() body: { userId: string, movieId: string }): Promise<boolean> {
    
    const token = request.headers.authorization.split(' ')[1];

    const userId = this.jwtStrategy.decodeToken(token);

    await this.likeService.addLike(userId, body.movieId);

    return true;
  }
}