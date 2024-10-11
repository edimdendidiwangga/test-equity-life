import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    if (body.username === 'user' && body.password === 'password') {
      return this.authService.login(body);
    }
    return { error: 'Invalid credentials' };
  }
}
