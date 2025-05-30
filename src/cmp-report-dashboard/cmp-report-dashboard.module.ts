import { Module } from '@nestjs/common';
import { CmpReportDashboardService } from './cmp-report-dashboard.service';
import { CmpReportDashboardController } from './cmp-report-dashboard.controller';

@Module({
  controllers: [CmpReportDashboardController],
  providers: [CmpReportDashboardService],
})
export class CmpReportDashboardModule {}
