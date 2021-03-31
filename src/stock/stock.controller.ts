import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { StockService } from './stock.service';
import { Response } from 'express';

@ApiUseTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}
  @Get('/polish/:symbol')
  async getPolishStock(@Res() res: Response, @Param('symbol') symbol: string) {
    this.stockService.getStockValue(symbol).then(success => {
      res.send(success);
    }, error => {
      res.status(404).send(error);
    });
  }
  @Get('/polish/multi/:symbols')
  async getPolishStocks(@Res() res: Response, @Param('symbols') symbol: string) {
    this.stockService.getMultipleStockValue(symbol.split(',')).then(success => {
      res.send(success);
    }, error => {
      res.status(404).send(error);
    });
  }
}
