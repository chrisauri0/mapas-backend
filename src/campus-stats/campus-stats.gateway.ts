import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CampusStatsService } from './campus-stats.service';

@WebSocketGateway({
  cors: { origin: '*' }, // en prod, restringe a tu dominio
})
export class CampusStatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly statsService: CampusStatsService) {}

  handleConnection(): void {
    this.statsService.incrementUsuarios();
    this.broadcastStats();
  }

  handleDisconnect(): void {
    this.statsService.decrementUsuarios();
    this.broadcastStats();
  }

  @SubscribeMessage('ruta:trazada')
  handleRutaTrazada(
    @MessageBody()
    payload: { destinoId: string; destinoNombre: string; origenNombre: string; distancia: number },
  ): void {
    this.statsService.registrarRuta(payload);
    this.broadcastStats();

    // Evento específico para "ruta en vivo" (más ligero, solo el último trazado)
    this.server.emit('ruta:en-vivo', {
      destinoNombre: payload.destinoNombre,
         origenNombre: payload.origenNombre,
      timestamp: new Date().toISOString(),
    });
  }

  private broadcastStats(): void {
    this.server.emit('stats:update', this.statsService.getStats());
  }
}