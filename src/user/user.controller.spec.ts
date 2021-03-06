import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { PasswordService } from './password.service';
import { forwardRef } from '@nestjs/common';
import { MetalModule } from '../metal/metal.module';
import { PassportModule } from '@nestjs/passport';
import { usersProviders } from './users.providers';

describe('User Controller', () => {
  let controller: UserController;

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

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
