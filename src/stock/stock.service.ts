import { HttpService, Injectable } from '@nestjs/common';
import { urls } from '../config';
import { StockScraperService } from './stock-scraper/stock-scraper.service';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class StockService {
  constructor(private readonly stockScraperService: StockScraperService,
              private readonly httpService: HttpService) {
  }

  async getStockValue(symbol: string) {
    return await this.stockScraperService.getStockValue(symbol);
  }
  async getMultipleStockValue(symbols: string[]) {
    const values: object[] = [];
    for (let i = 0; i < symbols.length; i++) {
      const res = await this.stockScraperService.getStockValue(symbols[i]);
      values.push({symbol: symbols[i], price: res});
    }
    // console.log(values, ' values');
    return values;
  }
}
