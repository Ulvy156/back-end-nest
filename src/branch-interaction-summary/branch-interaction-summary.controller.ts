import { Controller, Get, Query } from '@nestjs/common';
import { CollectedAccFilter } from 'src/branch-report-dashboard/branch-report-dashboard.interface';
import { BranchInteractionSummaryService } from './branch-interaction-summary.service';

@Controller('branch-interaction-summary')
export class BranchInteractionSummaryController {
  constructor(
    private readonly branchInteractionSummaryService: BranchInteractionSummaryService,
  ) {}

  @Get('/total-contact-accounts')
  async getNumberOfContactAcc(@Query() filterData: CollectedAccFilter) {
    return await this.branchInteractionSummaryService.getNumberOfContactAcc(
      filterData,
    );
  }

  @Get('/total-step-taken-accounts')
  async getNumberOfStepTakensAcc(@Query() filterData: CollectedAccFilter) {
    return await this.branchInteractionSummaryService.getNumberOfStepTakensAcc(
      filterData,
    );
  }

  @Get('/total-staff-recommend-accounts')
  async getNumberOfStaffRecommendAcc(@Query() filterData: CollectedAccFilter) {
    return await this.branchInteractionSummaryService.getNumberOfStaffRecommendAcc(
      filterData,
    );
  }
}
