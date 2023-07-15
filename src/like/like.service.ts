/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { Movie } from '../models/movies.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Movie') private movieModel: Model<Movie>,
  ) {}

  async addLike(userId: string, movieId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    const movie = await this.movieModel.findOne({ ref: movieId });
    
    if (!user) throw new UnauthorizedException();
    if (!movie) throw new UnauthorizedException();

    if (user.movies.includes(movieId) || movie.users.includes(userId)) return;
    
    user.movies.push(new ObjectId(movie._id).toString());
    movie.users.push(userId);
    
    await user.save();
    await movie.save();
  }

  async removeLike(userId: string, movieId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    const movie = await this.movieModel.findOne({ ref: movieId });
    
    if (!user) throw new UnauthorizedException();
    if (!movie) throw new UnauthorizedException();

    if (!user.movies.includes(movieId) || !movie.users.includes(userId)) return;
    
    user.movies = user.movies.filter((id) => id !== movieId);
    movie.users = movie.users.filter((id) => id !== userId);
    
    await user.save();
    await movie.save();
  }
}