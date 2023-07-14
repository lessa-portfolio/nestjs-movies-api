/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://lucaslessa:r4AWS8r43ByuSYSy@cluster0.iuzcqez.mongodb.net/'),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
