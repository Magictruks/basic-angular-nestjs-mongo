import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() authLoginDto: AuthLoginDto) {
    await this.authService.loginAndGetToken(req.user);
  }

  @Post('register')
  async register(@Request() req, @Body() authRegisterDto: AuthRegisterDto) {
    const user = await this.authService.register(authRegisterDto);
    await this.authService.loginAndGetToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('relogin')
  async reLogin(@Request() req) {
    await this.authService.loginAndGetToken(req.user);
  }

}
