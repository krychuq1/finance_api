import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { MetalModule } from './metal/metal.module';
import { StockModule } from './stock/stock.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [DatabaseModule, HttpModule, CryptoModule, MetalModule, StockModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
