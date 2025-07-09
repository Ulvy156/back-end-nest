import { Controller, Get, Query } from '@nestjs/common';
import { BranchReportDashboardService } from './branch-report-dashboard.service';
import { CollectedAccFilter } from './branch-report-dashboard.interface';

@Controller('branch-report-dashboard')
export class BranchReportDashboardController {
  constructor(
    private readonly branchReportDashboardService: BranchReportDashboardService,
  ) {}

  @Get('/collected-contact-account')
  async getColltectedContactAccBranch(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.branchReportDashboardService.getNumberOfContactAcc(
      filterData,
    );
  }

  @Get('/collected-account')
  async getCollectedAccBranch(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.branchReportDashboardService.getCollectedAccBranch(
      filterData,
    );
  }

  @Get('/collected-amount')
  async getCollectedAmtBranch(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.branchReportDashboardService.getCollectedAmtBranch(
      filterData,
    );
  }
  //contact tool
  @Get('/total-contact-accounts')
  async getNumberOfContactToolAcc(@Query() filterData: CollectedAccFilter) {
    return await this.branchReportDashboardService.getNumberOfContactToolAcc(
      filterData,
    );
  }
  //step taken
  @Get('/total-step-taken-accounts')
  async getNumberOfStepTakensAcc(@Query() filterData: CollectedAccFilter) {
    return await this.branchReportDashboardService.getNumberOfStepTakensAcc(
      filterData,
    );
  }
  //staff recommend
  @Get('/total-staff-recommend-accounts')
  async getNumberOfStaffRecommendAcc(@Query() filterData: CollectedAccFilter) {
    return await this.branchReportDashboardService.getNumberOfStaffRecommendAcc(
      filterData,
    );
  }
}
