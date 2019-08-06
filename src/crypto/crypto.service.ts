import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import {urls} from '../config';
import { ICrypto } from './ICrypto';

@Injectable()
export class CryptoService {
  constructor(private readonly httpService: HttpService) {}

   async getPrice(fsym: string, tsyms: string): Promise<ICrypto> {
    const appName: string = process.env.APP_NAME;
    const token: string = process.env.CRYPTO_API_KEY;
    const header: object = {ApiKey: token};
    const url = urls.crypto + fsym +
      '&' + 'tsyms=' + tsyms + '&extraParams=' + appName;
    const res = await this.httpService.get(url, {headers: header}).toPromise();
    return {crypto: fsym, price: res.data.USD, currency: tsyms};
  }
  async getMultiplePrice(fsyms: string, tsyms: string): Promise<ICrypto[]> {
    const appName: string = process.env.APP_NAME;
    const token: string = process.env.CRYPTO_API_KEY;
    const header: object = {ApiKey: token};
    const url = urls.crypto_price_multi + fsyms +
      '&' + 'tsyms=' + tsyms + '&extraParams=' + appName;
    const res = await this.httpService.get(url, {headers: header}).toPromise();
    const arrayOfCrypto: ICrypto[] = [];
    for (const property in res.data) {
      if (res.data.hasOwnProperty(property)) {
        const obj: ICrypto = {crypto: property, price: res.data[property].USD, currency: 'USD'};
        arrayOfCrypto.push(obj);
      }
    }
    return arrayOfCrypto;
  }
  // getCryptoPrices(): Promise<AxiosResponse<any>> {
  //   const cryptos
  // }
}
