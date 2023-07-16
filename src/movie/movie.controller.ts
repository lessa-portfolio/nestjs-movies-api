/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from 'src/models/movies.model';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie(@Body() movieData: Movie): Promise<Movie> {
    const newMovie = await this.movieService.createMovie(movieData);
    return newMovie;
  }
}