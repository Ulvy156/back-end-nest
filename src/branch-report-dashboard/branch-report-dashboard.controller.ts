import { Controller, Get, Query } from '@nestjs/common';
import { BranchReportDashboardService } from './branch-report-dashboard.service';
import { CollectedAccFilter } from './branch-report-dashboard.interface';

@Controller('branch-report-dashboard')
export class BranchReportDashboardController {
  constructor(
    private readonly branchReportDashboardService: BranchReportDashboardService,
  ) {}

  @Get('/collected-account')
  async getColltectedAccBranch(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.branchReportDashboardService.getColltectedAccBranch(
      filterData,
    );
  }

  @Get('/collected-amount')
  async getColltectedAmtBranch(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.branchReportDashboardService.getColltectedAmtBranch(
      filterData,
    );
  }
}
