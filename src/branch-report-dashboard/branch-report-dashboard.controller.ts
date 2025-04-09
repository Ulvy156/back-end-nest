import { Controller, Get, Param } from '@nestjs/common';
import { BranchReportDashboardService } from './branch-report-dashboard.service';

@Controller('branch-report-dashboard')
export class BranchReportDashboardController {
  constructor(
    private readonly branchReportDashboardService: BranchReportDashboardService,
  ) {}

  @Get()
  async getReportBranchDashboard(
    @Param('iuser_id') iuser_id: number,
  ): Promise<any> {
    return this.branchReportDashboardService.getReportBranchDashboard(iuser_id);
  }
}
