import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {}

  async createToken(loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    const payload: JwtPayload = { login: user.login };
    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validate(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    console.log(payload);
    return {};
  }
}
