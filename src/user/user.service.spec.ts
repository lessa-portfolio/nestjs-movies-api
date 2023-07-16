/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
    let userService: UserService;
    let userModel: Model<User>;
    const user = {
        _id: 'user-id',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        movies: []
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            UserService,
            {
            provide: getModelToken('User'),
            useValue: {
                create: jest.fn().mockResolvedValue(user),
                findById: jest.fn().mockResolvedValue(user),
                findOne: jest.fn().mockResolvedValue(user),
                save: jest.fn()
            },
            },
        ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userModel = module.get<Model<User>>(getModelToken('User'));
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData: User = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password',
                movies: []
            };

            const createdUser = await userService.createUser(userData);

            expect(createdUser).toEqual(user);
            expect(userModel.create).toHaveBeenCalledWith(userData);
        });
    });

    describe('findUserById', () => {
        it('should find a user by ID', async () => {
            const userId = 'user-id';

            jest.spyOn(userModel, 'findById').mockReturnValueOnce({
                exec: jest.fn().mockResolvedValue(user),
            } as any);

            const result = await userService.findUserById(userId);

            expect(result).toEqual(user);
            expect(userModel.findById).toHaveBeenCalledWith(userId);
        });
    });

    describe('findUserByEmail', () => {
        it('should find a user by email', async () => {
            const userEmail = 'john@example.com';

            jest.spyOn(userModel, 'findOne').mockReturnValueOnce({
                exec: jest.fn().mockResolvedValue(user),
            } as any);

            const result = await userService.findUserByEmail(userEmail);

            expect(result).toEqual(user);
            expect(userModel.findOne).toHaveBeenCalledWith({ email: userEmail });
        });
    });
});