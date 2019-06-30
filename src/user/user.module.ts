import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { PasswordService } from './password.service';
import { PassportModule } from '@nestjs/passport';
import { MetalModule } from '../metal/metal.module';
import { MetalService } from '../metal/metal.service';

@Module({
  imports: [
    forwardRef(() => MetalModule),
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [UsersService, PasswordService, ...usersProviders],
  exports: [UsersService, ...usersProviders],
})

export class UserModule {}
