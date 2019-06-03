import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UsersService, ...usersProviders],
})

export class UserModule {}
