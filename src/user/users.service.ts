import { Inject, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<IUser>) {}
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    try {
     return await createdUser.save();
   } catch (e) {
     return e;
   }
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
