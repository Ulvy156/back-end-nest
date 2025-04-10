import { Module } from '@nestjs/common';
import { BranchReportDashboardService } from './branch-report-dashboard.service';
import { BranchReportDashboardController } from './branch-report-dashboard.controller';
import { ViewBranchPermissionModule } from 'src/view-branch-permission/view-branch-permission.module';

@Module({
  imports: [ViewBranchPermissionModule],
  controllers: [BranchReportDashboardController],
  providers: [BranchReportDashboardService],
})
export class BranchReportDashboardModule {}
