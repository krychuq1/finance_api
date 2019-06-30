import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from './password.service';
import { LoginUserDto } from './dto/login-user.dto';
import { MetalService } from '../metal/metal.service';
import { IMetalSummary } from '../metal/interfaces/IMetalSummary';
// @Inject(forwardRef(() => MetalService))
// private readonly metalService: MetalService
@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<IUser>,
              private readonly passwordService: PasswordService,
              private readonly metalService: MetalService
             ) {}
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
    // console.log(userM)
    if (userM) {
      if (await this.passwordService.comparePassword(user.password, userM.password)) {
        return userM;
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
  async findAll(id: string): Promise<IMetalSummary> {
    try {
      // return await
      // get metals
      const res = await this.userModel.findById(id).populate('metals').exec();
      // console.log(res.metals);
      return await this.metalService.getTotalPriceForMetals(res.metals);

      // get total for metals

    } catch (e) {
      return e;
    }
  }
}
