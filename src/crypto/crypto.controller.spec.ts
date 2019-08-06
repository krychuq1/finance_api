import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { HttpModule } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

describe('Crypto Controller', () => {
  let controller: CryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CryptoController],
      providers: [CryptoService],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('check controller get price', async () => {
   const res = await controller.getPriceForCoin('BTC', 'USD');
   expect(res.price).toBeGreaterThan(1);
  });
});
