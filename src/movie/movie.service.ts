/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from 'src/models/movies.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private movieModel: Model<Movie>,
  ) {}

  async createMovie(movieData: Movie): Promise<Movie> {
    return this.movieModel.create(movieData);
  }

  async findMovieById(id: string): Promise<Movie> {
    return this.movieModel.findById(id).exec();
  }

  async findMovieByRef(ref: string): Promise<Movie> {
    return this.movieModel.findOne({ ref }).exec();
  }
}