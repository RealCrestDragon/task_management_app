import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket): Promise<void> {
    try {
      const token = client.handshake.query.token as string;
      const trimmedToken = token.replace('Bearer ', '');
      const payload = await this.jwtService.verifyAsync<{ id: number }>(
        trimmedToken,
      );
      const { id } = payload;
      await client.join(`user:${id}`);
    } catch {
      client.disconnect();
    }
  }

  pushNotification(
    userId: number,
    data: { title: string; content: string | undefined },
  ): void {
    this.server.to(`user:${userId}`).emit('notification', data);
  }
}
