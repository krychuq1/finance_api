import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { MetalModule } from './metal/metal.module';
import { StockModule } from './stock/stock.module';
// import { DatabaseModule } from './database/database.module';
// import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventsGateway } from './socket/events.gateway';
import { SocketCron } from './socket/socket.cron';
import { CurrencyModule } from './currency/currency.module';
import * as dotenv from 'dotenv';

dotenv.config();
// , CryptoModule, MetalModule,
//   AuthModule, CurrencyModule]
// , SocketCron, EventsGateway
@Module({
  imports: [HttpModule, StockModule, MetalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
