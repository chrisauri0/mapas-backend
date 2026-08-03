import { Module } from '@nestjs/common';
import { CampusStatsGateway } from './campus-stats.gateway';
import { CampusStatsService } from './campus-stats.service';

@Module({
  providers: [CampusStatsGateway, CampusStatsService],
})
export class CampusStatsModule {}