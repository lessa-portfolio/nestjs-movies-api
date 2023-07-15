/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async addLike(@Body() body: { userId: string, movieId: string }): Promise<void> {
    const { userId, movieId } = body;
    await this.likeService.addLike(userId, movieId);
  }
}