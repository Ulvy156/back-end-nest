import { Module } from '@nestjs/common';
import { ZoneReportDashboardService } from './zone-report-dashboard.service';
import { ZoneReportDashboardController } from './zone-report-dashboard.controller';

@Module({
  controllers: [ZoneReportDashboardController],
  providers: [ZoneReportDashboardService],
})
export class ZoneReportDashboardModule {}
