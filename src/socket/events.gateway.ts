import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CryptoService } from '../crypto/crypto.service';
import { SocketCron } from './socket.cron';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(private socketCron: SocketCron, private cryptoService: CryptoService) {}
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
    this.socketCron.getCryptoMultiPrices(client, this.cryptoService, cryptoList);
    // console.log('we should send multi crypto ', res);

  }

  afterInit(): any {
    // console.log(this.socketCron.getCryptoMultiPrices());
    console.log('socket init');
  }
}
