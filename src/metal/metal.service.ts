import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { urls } from '../config';
import { IMetal } from './interfaces/IMetal';
import { Model } from 'mongoose';
import { IUser } from '../user/interfaces/user.interface';
import { async } from 'rxjs/internal/scheduler/async';
import { IMetalSummary } from './interfaces/IMetalSummary';
import { MetalSummaryDto } from './dto/metalSummary.dto';

export enum metal {
  gold = 'gold',
  silver = 'silver',
}
@Injectable()
export class MetalService {
  // @Inject('SILVER_MODEL') private readonly silverModel: Model<IMetal>,
  constructor(private readonly httpService: HttpService,
              @Inject('METAL_MODEL') private readonly metalModel: Model<IMetal>,
              @Inject('USER_MODEL') private readonly userModel: Model<IMetal>) {}
// async: Promise<AxiosResponse<any>>
   async getMetalPrice(metalName: metal): Promise<number> {
    const url: string = urls[metalName];
    const res = await this.httpService.get(url).toPromise();
    return res.data[0].spreadProfilePrices[0].ask;
    // const res = await
    // console.log(res.data);
    // return this.httpService.get(urls.silver)
  }
  async getTotalPriceForMetals(metals: IMetal[]): Promise<IMetalSummary> {
    const metalSummary = new MetalSummaryDto();
    for(const obj of metals) {
      const price = await this.getMetalPrice(metal[obj.type]);
      metalSummary.total += (price * obj.oz);
      metalSummary[obj.type].oz = obj.oz;
      metalSummary[obj.type].total = price * obj.oz;
      metalSummary[obj.type].oz = obj.oz;
    }
    metalSummary.roundTotal(2);
    return metalSummary;

  }
  async addMetal(type: metal, oz: number, userId: string) {
    // get document from db
    const res = await this.metalModel.findOne({user: userId, type}).exec();
    // check if user has metal document
    if (res) {
      // update document
      await res.updateOne({oz: res.oz + oz}).exec();
      return {oz: res.oz + oz};
    } else {
      const addedMetal = this.metalModel({oz, user: userId, type});
      // save metal
      await addedMetal.save();
      // get and update user with metal
      const user = await this.userModel.findById({_id: userId});
      user.metals.push(addedMetal);
      await user.save();
      return {oz};
    }
  }
  // async addSilver(oz: number, userId: string) {
  //   // find and update
  //  const res = await this.silverModel.findOne({user: userId}).exec();
  //  if (res) {
  //    const updated = await res.updateOne({oz: res.oz + oz}).exec();
  //    return {oz: res.oz + oz};
  //  } else {
  //    const addedSilver = new this.silverModel({oz, user: userId});
  //    await addedSilver.save();
  //    const user = await this.userModel.findById({_id: userId});
  //    user.metals.push(addedSilver);
  //    await user.save();
  //    return {oz};
  //  }
  // }
  // async addGold(oz: number, userId: string) {
  //   // find gold model which belongs to user
  //   const goldObj = await this.goldModel.findOne({user: userId}).exec();
  //   // if exist
  //   if (goldObj) {
  //     // update existing
  //     await goldObj.updateOne({oz: goldObj.oz + oz}).exec();
  //     // return {oz: res.oz + oz};
  //   }
  // }
}
