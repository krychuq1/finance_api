import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export  class EventsGateway implements OnGatewayConnection{
  @WebSocketServer()
  webServer;

  handleConnection(client) {
    client.emit('connection', 'SUCCESS');
  }

}