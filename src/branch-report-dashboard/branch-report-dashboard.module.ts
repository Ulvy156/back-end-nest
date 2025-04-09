import { Module } from '@nestjs/common';
import { BranchReportDashboardService } from './branch-report-dashboard.service';
import { BranchReportDashboardController } from './branch-report-dashboard.controller';

@Module({
  controllers: [BranchReportDashboardController],
  providers: [BranchReportDashboardService],
})
export class BranchReportDashboardModule {}
