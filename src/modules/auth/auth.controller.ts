import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateSessionDto } from './dto/createSession.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('session')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() createSessionDto: CreateSessionDto) {
    return this.authService.login(createSessionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async guardedTestEndpont() {
    return 'Ok! You are authenticated';
  }
}
