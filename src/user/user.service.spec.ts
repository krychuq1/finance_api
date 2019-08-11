import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { PasswordService } from './password.service';
import { forwardRef } from '@nestjs/common';
import { MetalModule } from '../metal/metal.module';
import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { usersProviders } from './users.providers';
import { UserController } from './user.controller';
import { StockService } from '../stock/stock.service';
import { async } from 'rxjs/internal/scheduler/async';

describe('StockService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => MetalModule),
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
      controllers: [UserController],
      providers: [UsersService, PasswordService, ...usersProviders]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all user info', async () => {
    const res = await service.findAll('5d0ffa5ff325253f48e4d0d6');
    expect(res.login.length).toBeGreaterThanOrEqual(1);
  });
});
