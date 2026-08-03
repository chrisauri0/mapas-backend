import { Controller, Get, Post, Body } from '@nestjs/common';
import { CampusStatsService } from './campus-stats.service';

@Controller('actividad')
export class CampusStatsController {
  constructor(private readonly statsService: CampusStatsService) {}

  @Get()
  getActividad() {
    return this.statsService.getActividadWearable();
  }

  @Post('pasos')
  registrarPasos(@Body() body: { pasos: number }) {
    this.statsService.registrarPasos(body.pasos);
    return { ok: true };
  }
}