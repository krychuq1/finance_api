import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketCron } from './socket.cron';

export interface ISocketCurrency {
  base: string;
  symbols: string;
}
@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(private socketCron: SocketCron) {}
  @WebSocketServer()
  webServer: Server;

  handleConnection(client) {
    console.log('client connection');
    client.emit('connection', 'SUCCESS');
  }
  @SubscribeMessage('login')
  handleMessage(client: Socket, data: object): WsResponse {
    return {event: 'data', data};
  }
  @SubscribeMessage('getMultiCryptoPrice')
   sendMultiPrice(client: Socket, cryptoList: string): void {
    // console.log(data);
    // const res = await this.cryptoService.getMultiplePrice('BTC,ETH', 'USD');
    this.socketCron.getCryptoMultiPrices(client, cryptoList);
    // console.log('we should send multi crypto ', res);

  }
  @SubscribeMessage('getMultiMetalPrice')
  sendMultiMetalPrice(client: Socket): void {
     this.socketCron.getMetalsPrices(client);
  }
  @SubscribeMessage('getMultiStockPrice')
  sendMultiStockPrice(client: Socket, symbols: string[]): void {
    this.socketCron.getStockPrices(client, symbols);
  }
  @SubscribeMessage('getCurrencies')
  sendCurrencies(client: Socket, data: ISocketCurrency): void {
    this.socketCron.getCurrencies(client, data);
  }
  afterInit(): any {
    // console.log(this.socketCron.getCryptoMultiPrices());
    // console.log('socket init');
  }
}
