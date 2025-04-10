import { Body, Controller, Get } from '@nestjs/common';
import { BranchReportDashboardService } from './branch-report-dashboard.service';
import { CollectedAccFilter } from './branch-report-dashboard.interface';

@Controller('branch-report-dashboard')
export class BranchReportDashboardController {
  constructor(
    private readonly branchReportDashboardService: BranchReportDashboardService,
  ) {}

  @Get()
  async getReportBranchDashboard(
    @Body() filterData: CollectedAccFilter,
  ): Promise<any> {
    return this.branchReportDashboardService.getColltectedAccBranch(filterData);
  }
}
