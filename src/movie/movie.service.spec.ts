/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { getModelToken } from '@nestjs/mongoose';
import { Movie } from 'src/models/movies.model';
import { Model } from 'mongoose';

describe('MovieService', () => {
    let movieService: MovieService;
    let movieModel: Model<Movie>;
    const movie = {
        ref: '1234',
        _id: 'movie-id',
        users: []
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            MovieService,
            {
            provide: getModelToken('Movie'),
            useValue: {
                create: jest.fn().mockResolvedValue(movie),
            },
            },
        ],
        }).compile();

        movieService = module.get<MovieService>(MovieService);
        movieModel = module.get<Model<Movie>>(getModelToken('Movie'));
    });

    describe('createMovie', () => {
        it('should create a new movie', async () => {
            const movieData = {
                ref: '1234',
                users: []
            };

            const createdMovie = await movieService.createMovie(movieData);

            expect(createdMovie).toEqual(movie);
            expect(movieModel.create).toHaveBeenCalledWith(movieData);
        });
    });
});