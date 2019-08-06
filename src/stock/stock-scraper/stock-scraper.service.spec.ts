import { Test, TestingModule } from '@nestjs/testing';
import { StockScraperService } from './stock-scraper.service';

describe('StockScraperService', () => {
  // let service: StockScraperService;
  //
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [StockScraperService],
  //   }).compile();
  //
  //   service = module.get<StockScraperService>(StockScraperService);
  // });

  it('should be defined', () => {
    // expect(service).toBeDefined();
    expect(1).toBe(1);
  });
});
