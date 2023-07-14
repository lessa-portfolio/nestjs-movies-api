/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }): Promise<{ token: string }> {
    const user = await this.authService.validateUser(credentials.email, credentials.password);

    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const token = await this.authService.generateJwtToken(user);
    return { token };
  }
}