/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Request, UnauthorizedException, Get } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly jwtStrategy: JwtStrategy
  ) {}

  @Post('like')
  async addLike(@Request() request: any, @Body() body: { userId: string, movieId: string }): Promise<void> {
    const token = request.headers.authorization.split(' ')[1];
    
    if (!token) throw new UnauthorizedException('jwt must be provided');
    
    try {
      const userId = this.jwtStrategy.decodeToken(token);
      await this.likeService.addLike(userId, body.movieId);
      return;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('dislike')
  async removeLike(@Request() request: any, @Body() body: { userId: string, movieId: string }): Promise<void> {
    const token = request.headers.authorization.split(' ')[1];

    if (!token) throw new UnauthorizedException('jwt must be provided');

    try {
      const userId = this.jwtStrategy.decodeToken(token);
      await this.likeService.removeLike(userId, body.movieId);
      return;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException(error.message);
    }
  }

  @Get()
  async getMoviesLikedByUser(@Request() request: any): Promise<string[]> {
    const token = request.headers.authorization.split(' ')[1];

    if (!token) throw new UnauthorizedException('jwt must be provided');

    try {
      const userId = this.jwtStrategy.decodeToken(token);
  
      const movies = await this.likeService.getMoviesLikedByUser(userId);
  
      return movies;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException(error.message);
    }
  }
}