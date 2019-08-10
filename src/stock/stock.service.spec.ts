import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { HttpModule } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockScraperService } from './stock-scraper/stock-scraper.service';
import { async } from 'rxjs/internal/scheduler/async';

describe('StockService', () => {
  let service: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [StockController],
      providers: [StockScraperService, StockService],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return stock value', async () => {
    const res = await service.getStockValue('PKN');
    expect(res.symbol).toBe('PKN');
  });
});
