import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdificiosModule } from './edificios/edificios.module';
import { CampusStatsGateway } from './campus-stats/campus-stats.gateway';
import { CampusStatsModule } from './campus-stats/campus-stats.module';
import { CampusStatsService } from './campus-stats/campus-stats.service';


@Module({
  imports: [EdificiosModule,CampusStatsModule],
  controllers: [AppController],
  providers: [AppService, CampusStatsGateway,CampusStatsService],
})
export class AppModule {}
