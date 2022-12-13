import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: string): string {
    console.log(data);
    this.server.emit('events', data);
    return data;
  }
  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log(data);
    return data;
  }
}
