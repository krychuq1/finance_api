import { Test, TestingModule } from '@nestjs/testing';
import { metal, MetalService } from './metal.service';
// import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { forwardRef, HttpModule } from '@nestjs/common';
// import { DatabaseModule } from '../database/database.module';
import { metalProvider } from './providers/metal.provider';
import { MetalController } from './metal.controller';
import { async } from 'rxjs/internal/scheduler/async';

describe('MetalService', () => {
  let service: MetalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [MetalController],
      providers: [...metalProvider, MetalService],
    }).compile();

    service = module.get<MetalService>(MetalService);
  });
  it('check if type is correct', async () => {
    const res = await service.getMetalPrice(metal.gold);
    expect(res.oz).toBeGreaterThanOrEqual(1);
    expect(res.price).toBeGreaterThanOrEqual(1);
  });
  it('check if correct array', async () => {
    const res = await service.getMultiPricesForMetals([metal.silver, metal.gold]);
    expect(res[0].price).toBeGreaterThanOrEqual(1);
  });
  it('should add metal to user', async () => {
    service.addMetal(metal.silver, 1, '');
  })
});
