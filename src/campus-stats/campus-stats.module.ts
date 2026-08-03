import { Module } from '@nestjs/common';
import { CampusStatsGateway } from './campus-stats.gateway';
import { CampusStatsService } from './campus-stats.service';
import { CampusStatsController } from './campus-stats.controller';

@Module({
  providers: [CampusStatsGateway, CampusStatsService],
  controllers: [CampusStatsController],
})
export class CampusStatsModule {}