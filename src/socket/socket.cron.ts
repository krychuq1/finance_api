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

  getCryptoMultiPrices(client: Socket, cryptoList: string) {
    new this.CronJob('*/15 * * * * *', async () => {
      const res = await this.cryptoService.getMultiplePrice(cryptoList, 'USD');
      client.emit('multiCryptoPrice', res);
    }, null, true, timeZone);
  }
  getMetalsPrices(client: Socket) {
    new this.CronJob('*/15 * * * * *', async () => {
      const res = await this.metalService.getTotalPriceForMetals([{oz: 1, type: metal.silver} , {oz: 1, type: metal.gold}]);
      client.emit('multiMetalPrice', res);
    }, null, true, timeZone);
  }
  getStockPrices(client: Socket, symbols: string[]) {
    new this.CronJob('*/15 * * * * *', async () => {
      const res = await this.stockService.getMultipleStockValue(symbols);
      console.log(res);
      client.emit('multiStockPrice', res);
    }, null, true, timeZone);
  }
}
