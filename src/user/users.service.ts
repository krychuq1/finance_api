import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from './password.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<IUser>,
              private readonly passwordService: PasswordService) {}
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    createUserDto.password = await this.passwordService.hashPassword(createUserDto.password);
    const createdUser = new this.userModel(createUserDto);
    try {
     return await createdUser.save();
   } catch (e) {
     return e;
   }
  }
  async login(user: LoginUserDto): Promise<IUser> {
    const userM = await this.findByLogin(user.login);
    if (userM) {
      if (await this.passwordService.comparePassword(user.password, userM.password)) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
  async findByLogin(login: string): Promise<IUser> {
    return await this.userModel.findOne({login});
  }
  async findAll(): Promise<IUser> {
    try{
      const res = await this.userModel.find().exec();
      return res;
    } catch (e) {
      return e;
    }
  }
}
