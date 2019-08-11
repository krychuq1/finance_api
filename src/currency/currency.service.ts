import { HttpService, Injectable, Logger } from '@nestjs/common';
import { urls } from '../config';
import { ICurrency } from './ICurrency';

@Injectable()
export class CurrencyService {
  logger: Logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger();
  }
  async getCurrencies(base: string, currencies: string): Promise<ICurrency> {
    const res = await this.httpService.get(urls.currency + 'base=' + base + '&symbols=' + currencies).toPromise();
    const obj = res.data.rates;
    const objToReturn: ICurrency = {base, date: res.data.date, rates: []};
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        objToReturn.rates.push({symbol: property, price: obj[property]});
      }
    }
    return objToReturn;

  }
}
