/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserModel, UserSchema } from './models/user.model';

@Module({
  imports: [
    MongooseModule.forRoot('YOUR_URI'),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
