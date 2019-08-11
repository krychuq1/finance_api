import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from './password.service';
import { LoginUserDto } from './dto/login-user.dto';
import { MetalService } from '../metal/metal.service';
import { IMetalSummary } from '../metal/interfaces/IMetalSummary';
import { IUserSummary } from './interfaces/IUserSummary';
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
// : Promise<IMetalSummary>
  async findAll(id: string): Promise<IUserSummary> {
    try {
      const res = await this.userModel.findById(id).populate('metals').exec();
      const userSummary: IUserSummary = {login: res.login, metals: []};
      for(let i = 0; i < res.metals.length; i++) {
        const price = await this.metalService.getMetalPrice(res.metals[i].type).then(val => {return val.price});
        const o: IMetalSummary = {type: res.metals[i].type, oz: res.metals[i].oz, pricePerOz: price, total: res.metals[i].oz * price};
        userSummary.metals.push(o);
      }
      return userSummary;
    } catch (e) {
      return e;
    }
  }
}
