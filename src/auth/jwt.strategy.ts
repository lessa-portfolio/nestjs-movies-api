/* eslint-disable prettier/prettier */

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { UserService } from '../user/user.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly userService: UserService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'chave_secreta',
//     });
//   }

//   async validate(payload: any) {
//     const user = await this.userService.findUserById(payload.sub);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }