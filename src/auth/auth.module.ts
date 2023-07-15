/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'chave_secreta',
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}