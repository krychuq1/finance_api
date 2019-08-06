import { HttpService, Injectable } from '@nestjs/common';
import { urls } from '../../config';
import * as cheerio from 'cheerio';

@Injectable()
export class StockScraperService {
  constructor(private readonly httpService: HttpService) {}

  getStockValue(symbol: string): Promise<string> {
    return new Promise(((resolve, reject) => {
      const url: string = urls.polishStock + symbol.toUpperCase();
      this.httpService.get(url).subscribe(res => {
        const $ = cheerio.load(res.data);
        resolve($('.profile_quotation span.q_ch_act').text());
      }, error => {
        reject('error wrong symbol');
      });
    }));
  }
}
