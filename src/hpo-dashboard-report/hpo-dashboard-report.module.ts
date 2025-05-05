import { Module } from '@nestjs/common';
import { HpoDashboardReportService } from './hpo-dashboard-report.service';
import { HpoDashboardReportController } from './hpo-dashboard-report.controller';

@Module({
  controllers: [HpoDashboardReportController],
  providers: [HpoDashboardReportService],
})
export class HpoDashboardReportModule {}
