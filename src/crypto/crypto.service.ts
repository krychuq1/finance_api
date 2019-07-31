import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import {urls} from '../config';

@Injectable()
export class CryptoService {
  constructor(private readonly httpService: HttpService) {}

   getPrice(fsym: string, tsyms: string): Promise<AxiosResponse<any>> {
    const appName: string = process.env.APP_NAME;
    const token: string = process.env.CRYPTO_API_KEY;
    const header: object = {ApiKey: token};
    const url = urls.crypto + fsym +
      '&' + 'tsyms=' + tsyms + '&extraParams=' + appName;
    return this.httpService.get(url, {headers: header}).toPromise();
  }
  getMultiplePrice(fsyms: string, tsyms: string): Promise<AxiosResponse<any>> {
    const appName: string = process.env.APP_NAME;
    const token: string = process.env.CRYPTO_API_KEY;
    const header: object = {ApiKey: token};
    const url = urls.crypto_price_multi + fsyms +
      '&' + 'tsyms=' + tsyms + '&extraParams=' + appName;
    return this.httpService.get(url, {headers: header}).toPromise();

  }
  // getCryptoPrices(): Promise<AxiosResponse<any>> {
  //   const cryptos
  // }
}
