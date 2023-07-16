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

  async getMoviesLikedByUser(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId);

    if (!user) throw new UnauthorizedException();

    const likedMovieIds = user.movies;

    const likedMovies = await this.movieModel.find({ _id: { $in: likedMovieIds } });
    
    const likedMovieRefs = likedMovies.map(movie => movie.ref);

    return likedMovieRefs;
  }

  async addLike(userId: string, movieId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    const movie = await this.movieModel.findOne({ ref: movieId });
    
    if (!user) throw new UnauthorizedException('user not found');
    if (!movie) throw new UnauthorizedException('movie not found');

    if (user.movies.includes(movieId) || movie.users.includes(userId)) {
      throw new UnauthorizedException('movie already liked');
    }
    
    user.movies.push(new ObjectId(movie._id).toString());
    movie.users.push(userId);
    
    await user.save();
    await movie.save();
  }

  async removeLike(userId: string, movieRef: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    const movie = await this.movieModel.findOne({ ref: movieRef });
    
    if (!user) throw new UnauthorizedException('user not found');
    if (!movie) throw new UnauthorizedException('movie not found');
    
    const movieId = new ObjectId(movie._id).toString();

    if (!user.movies.includes(movieId) && !movie.users.includes(userId)) {
      throw new UnauthorizedException('movie already disliked');
    }
    
    movie.users = movie.users.filter((id) => id.toString() !== userId);
    user.movies = user.movies.filter((id) => id.toString() !== movieId);
    
    await user.save();
    await movie.save();
  }
}