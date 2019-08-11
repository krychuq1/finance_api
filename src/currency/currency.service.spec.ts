import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { HttpModule } from '@nestjs/common';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CurrencyService],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return currency list', async () => {
    const res = await service.getCurrencies('PLN', 'GBP,EUR');
    expect(res.base).toBe('PLN');
    expect(res.rates.length).toBe(2);
  });
});
