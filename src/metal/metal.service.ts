import { HttpService, Inject, Injectable } from '@nestjs/common';
import { urls } from '../config';
import { Model } from 'mongoose';
import { MetalDto } from './dto/metal.dto';
import { IMetal } from './interfaces/IMetal';

export enum metal {
  gold = 'gold',
  silver = 'silver',
}
// @Inject('USER_MODEL') private readonly userModel: Model<IMetal
@Injectable()
export class MetalService {
  constructor(private readonly httpService: HttpService,
              @Inject('METAL_MODEL') private readonly metalModel: Model<MetalDto> ) {}
   async getMetalPrice(metalName: metal): Promise<MetalDto> {
    return;
    // const url: string = urls[metalName];
    // console.log('here, ', url, metalName);
    // const res = await this.httpService.get(url).toPromise();
    // return new MetalDto(1, res.data[0].spreadProfilePrices[0].bid, metalName);
  }
  async getMultiPricesForMetals(metals: metal[]): Promise<MetalDto[]> {

    const metalsToReturn: MetalDto[] = [];
    for (let i = 0; i < metals.length; i++) {
      metalsToReturn.push(await this.getMetalPrice(metals[i]));
    }
    return metalsToReturn;
  }
  async addMetal(metal: MetalDto): Promise<IMetal> {
    // // get document from db
    // const res = await this.metalModel.findOne({user: userId, type}).exec();
    // // check if user has metal document
    // if (res) {
    //   // update document
    //   await res.updateOne({oz: res.oz + oz}).exec();
    //   return {oz: res.oz + oz};
    // } else {
      const addedMetal = this.metalModel({oz: metal.oz, user: metal.userId, type: metal.type});
      // save metal
      await addedMetal.save();
      return addedMetal;
      // get and update user with metal
      // const user = await this.userModel.findById({_id: userId});
      // user.metals.push(addedMetal);
      // await user.save();
      // return {oz};
    // }
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
