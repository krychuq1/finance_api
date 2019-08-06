import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import { HttpModule } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import * as dotenv from 'dotenv';
import { ICrypto } from './ICrypto';
import { async } from 'rxjs/internal/scheduler/async';
dotenv.config();

describe('CryptoService', () => {
  let service: CryptoService;
  //
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CryptoController],
      providers: [CryptoService],
    }).compile();
  //
    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    // expect(1).toBe(1);
  });
  it('check if btc price is bigger than 1', async () => {
    const data = await service.getPrice('BTC', 'USD');
    expect(data.price).toBeGreaterThan(1);
  });
  it('check multi crypto' , async () => {
    const data = await service.getMultiplePrice('BTC,LTC', 'USD');
    expect(data.length).toBe(2);
  });
});
