import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { MetalModule } from './metal/metal.module';
import { StockModule } from './stock/stock.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { EventsGateway } from './socket/events.gateway';

dotenv.config();

@Module({
  imports: [DatabaseModule, HttpModule, CryptoModule, MetalModule, StockModule,
    UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
