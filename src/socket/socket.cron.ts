import * as cron from 'cron';
import { Socket } from 'socket.io';
import { CryptoService } from '../crypto/crypto.service';
import { MetalService, metal } from '../metal/metal.service';
import { Injectable } from '@nestjs/common';
import { timeZone } from '../config';
import { StockService } from '../stock/stock.service';
@Injectable()
export class SocketCron {
  CronJob: any;
  constructor(private metalService: MetalService, private cryptoService: CryptoService,
              private stockService: StockService) {
    this.CronJob = cron.CronJob;
  }

  async getCryptoMultiPrices(client: Socket, cryptoList: string) {
    const res = await this.cryptoService.getMultiplePrice(cryptoList, 'USD');
    client.emit('multiCryptoPrice', res);
    new this.CronJob('*/15 * * * * *', async () => {
      const res = await this.cryptoService.getMultiplePrice(cryptoList, 'USD');
      client.emit('multiCryptoPrice', res);
    }, null, true, timeZone);
  }
  async getMetalsPrices(client: Socket) {
    const res = await this.metalService.getMultiPricesForMetals([metal.gold, metal.silver]);
    client.emit('multiMetalPrice', res);
    new this.CronJob('*/15 * * * * *', async () => {
      const res = await this.metalService.getMultiPricesForMetals([metal.gold, metal.silver]);
      client.emit('multiMetalPrice', res);
    }, null, true, timeZone);
  }
  async getStockPrices(client: Socket, symbols: string[]) {
    const res = await this.stockService.getMultipleStockValue(symbols);
    client.emit('multiStockPrice', res);
    // At every 5th minute past every hour from 9 through 17 on every day-of-week
    new this.CronJob('*/5 9-17 * * 1-5', async () => {
      console.log('inner');
      const res = await this.stockService.getMultipleStockValue(symbols);
      client.emit('multiStockPrice', res);
    }, null, true, timeZone);
  }
}
