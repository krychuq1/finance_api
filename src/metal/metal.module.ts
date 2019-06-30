import { HttpModule, Module } from '@nestjs/common';
import { MetalController } from './metal.controller';
import { MetalService } from './metal.service';
import { metalProvider } from './providers/metal.provider';
import { DatabaseModule } from '../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

@Module({
  imports: [HttpModule, DatabaseModule, UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MetalController],
  providers: [...metalProvider, MetalService],
  exports: [MetalService],
})
export class MetalModule {

}
