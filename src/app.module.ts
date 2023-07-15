/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
// import { LikeModule } from './like/like.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    // LikeModule,
    MovieModule,
    MongooseModule.forRoot('mongodb+srv://lucaslessa:r4AWS8r43ByuSYSy@cluster0.iuzcqez.mongodb.net/'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
