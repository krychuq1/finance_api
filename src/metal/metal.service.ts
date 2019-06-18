import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { urls } from '../config';
import { ISilver } from './interfaces/ISilver';
import { Model } from 'mongoose';
import { IUser } from '../user/interfaces/user.interface';

export enum metal {
  gold = 'gold',
  silver = 'silver',
}
@Injectable()
export class MetalService {
  constructor(private readonly httpService: HttpService,
              @Inject('SILVER_MODEL') private readonly silverModel: Model<ISilver>,
              @Inject('USER_MODEL') private readonly userModel: Model<IUser>) {}

  getMetalPrice(metalName: metal): Promise<AxiosResponse<any>> {
    const url: string = urls[metalName];
    return this.httpService.get(url).toPromise();
    // return this.httpService.get(urls.silver)
  }
  async addSilver(oz: number, userId: string) {
    // find and update
   const res = await this.silverModel.findOne().exec();
   if (res) {
     const addedSilver = new this.silverModel({oz, user: userId});
     await addedSilver.save();
     const user = await this.userModel.findById({_id: userId});
     user.metals.push(addedSilver);
     await user.save();
     // console.log(updated);
     return {oz};
   } else {
     console.log(res);
      const updated = await res.updateOne({oz: res.oz + oz}).exec();
      return {oz: res.oz + oz};

   }
  }

}
