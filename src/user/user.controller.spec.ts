/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from '../models/user.model';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let connection: Connection;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb+srv://lucaslessa:r4AWS8r43ByuSYSy@cluster0.iuzcqez.mongodb.net/'),
                MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
            ],
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UserService>(UserService);
        connection = moduleRef.get(getConnectionToken());
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData: User = {
                name: 'John',
                email: 'john@example.com',
                password: 'password',
                movies: []
            };

            const newUser: User = {
                ...userData,
                id: '64b0c4b283e5066b4ba0eca4',
            };

            jest.spyOn(userService, 'createUser').mockResolvedValue(newUser);

            const result = await userController.createUser(userData);

            expect(result).toEqual(newUser);
            expect(userService.createUser).toHaveBeenCalledWith(userData);
        });
    });

    afterAll(async () => {
        await connection.close();
    });
});