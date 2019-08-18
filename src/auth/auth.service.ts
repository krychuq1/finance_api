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
    const payload: JwtPayload = { login: user.login, userId: user._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn: '24h',
      accessToken,
      user: await this.userService.findAll(user._id),
    };
  }

  async validate(payload: JwtPayload): Promise<any> {
    // get user from database based on email
    // return user objectId else reject ;)
    // const user = await this.userService.findByLogin(payload.login);
    // console.log(user);
    return payload;
  }
}
