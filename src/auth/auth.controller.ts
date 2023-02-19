import { Controller, Get, Request, Post, Req, BadRequestException } from "@nestjs/common";

import { AuthService } from './auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Req() req) {

    const user = await this.authService.validateUser(req.body);
    if (!user) {
      throw new BadRequestException();
    }
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}