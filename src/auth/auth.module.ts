/* eslint-disable prettier/prettier */

// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';
// import { UserModule } from '../user/user.module';

// @Module({
//   imports: [
//     UserModule,
//     PassportModule,
//     JwtModule.register({
//       secret: 'chave_secreta',
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   providers: [JwtStrategy],
//   exports: [JwtStrategy, JwtModule],
// })
// export class AuthModule {}