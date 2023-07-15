/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'chave_secreta',
    });
  }

  decodeToken(token: any): string {
    const decodedToken = jwt.verify(token, 'chave_secreta');

    const userId = decodedToken.sub.toString();
    
    return userId;
  }
}