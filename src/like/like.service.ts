/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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
    const user = await this.userModel.findOne({ _id: userId });
    const movie = await this.movieModel.findOne({ ref: movieId });

    if (!user || !movie) throw new Error('User or movie not found');

    user.movies.push(new ObjectId(movie._id).toString());
    movie.users.push(userId);

    await user.save();
    await movie.save();
  }
}