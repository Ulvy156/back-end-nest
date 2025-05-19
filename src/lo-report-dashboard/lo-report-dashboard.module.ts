import { Module } from '@nestjs/common';
import { LoReportDashboardService } from './lo-report-dashboard.service';
import { LoReportDashboardController } from './lo-report-dashboard.controller';

@Module({
  controllers: [LoReportDashboardController],
  providers: [LoReportDashboardService],
})
export class LoReportDashboardModule {}
