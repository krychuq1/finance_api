import { HttpModule, Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockScraperService } from './stock-scraper/stock-scraper.service';
import { StockService } from './stock.service';

@Module({
  imports: [HttpModule],
  controllers: [StockController],
  providers: [StockScraperService, StockService],
  exports: [StockService],
})
export class StockModule {
}
