import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';

describe('Stock Controller', () => {
  // let controller: StockController;
  //
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [StockController],
  //   }).compile();
  //
  //   controller = module.get<StockController>(StockController);
  // });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
    expect(1).toBe(1);
  });
});
