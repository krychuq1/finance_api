import * as cron from 'cron';
import { Socket } from 'socket.io';
import { CryptoService } from '../crypto/crypto.service';
import { MetalService } from '../metal/metal.service';
export class SocketCron {
  CronJob: any;
  constructor(metalService: MetalService, private cryptoService: CryptoService) {
    this.CronJob = cron.CronJob;
    console.log(cryptoService, 'ha hahahahahh');
  }

  getCryptoMultiPrices(client: Socket, cryptoService: CryptoService, cryptoList: string) {
    new this.CronJob('*/5 * * * * *', async () => {
      // console.log(cryptoService);
      const res = await cryptoService.getMultiplePrice(cryptoList, 'USD');
      // console.log(res);
      client.emit('multiCryptoPrice', res.data);
      console.log('You will see this message ever 5 seconds');
    }, null, true, 'America/Los_Angeles');
  }
}
