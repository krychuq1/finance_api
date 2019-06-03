import { HttpService, Injectable } from '@nestjs/common';
import { urls } from '../config';
import { StockScraperService } from './stock-scraper/stock-scraper.service';

@Injectable()
export class StockService {
  constructor(private readonly stockScraperService: StockScraperService,
              private readonly httpService: HttpService) {
  }

  async getStockValue(symbol: string) {
    return await this.stockScraperService.getStockValue(symbol);
  }
}
