import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { urls } from '../config';

export enum metal {
  gold = 'gold',
  silver = 'silver',
}
@Injectable()
export class MetalService {
  constructor(private readonly httpService: HttpService) {}

  getMetalPrice(metalName: metal): Promise<AxiosResponse<any>> {
    const url: string = urls[metalName];
    return this.httpService.get(url).toPromise();
    // return this.httpService.get(urls.silver)
  }

}
