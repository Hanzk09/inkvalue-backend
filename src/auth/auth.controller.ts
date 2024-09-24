import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';
import { RefreshAuthGuard } from './refresh-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }
  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(@Req() req) {
    return await this.authService.login(req.user);
  }
}
