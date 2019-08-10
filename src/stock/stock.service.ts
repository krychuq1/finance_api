import { HttpService, Injectable } from '@nestjs/common';
import { urls } from '../config';
import { StockScraperService } from './stock-scraper/stock-scraper.service';
import { async } from 'rxjs/internal/scheduler/async';
import { IStock } from './IStock';

@Injectable()
export class StockService {
  constructor(private readonly stockScraperService: StockScraperService,
              private readonly httpService: HttpService) {
  }

  async getStockValue(symbol: string): Promise<IStock> {
    const res = await this.stockScraperService.getStockValue(symbol);
    return {symbol, currency: 'pln', price: Number(res)};

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
