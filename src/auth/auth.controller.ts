import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';

@ApiUseTags('User Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async createToken(@Body() login: LoginUserDto): Promise<any> {
    return await this.authService.createToken(login);;
  }
  // @ApiBearerAuth()
  @Get('data')
  @UseGuards(AuthGuard())
  findAll(@Req() request ) {
    return 'works';
    // this route is restricted by AuthGuard
    // JWT strategy
  }
  getPayload() {

  }
}
