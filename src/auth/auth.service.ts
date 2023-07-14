/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findUserByEmail(email);
    
        if (user && user.password === password) return user;
    
        return null;
    }

    async validateUserById(userId: string): Promise<User | null> {
        return this.userService.findUserById(userId);
    }
    
    async generateJwtToken(user: User): Promise<string> {
        const payload = { sub: user.id };
        return this.jwtService.signAsync(payload);
    }
}