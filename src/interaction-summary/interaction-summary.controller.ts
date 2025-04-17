import { Controller, Get, Query } from '@nestjs/common';
import { InteractionSummaryService } from './interaction-summary.service';
import { CollectedAccFilter } from 'src/branch-report-dashboard/branch-report-dashboard.interface';

@Controller('interaction-summary')
export class InteractionSummaryController {
  constructor(
    private readonly interactionSummaryService: InteractionSummaryService,
  ) {}

  @Get('/total-contact-accounts')
  async getNumberOfContactAcc(@Query() filterData: CollectedAccFilter) {
    console.log('Received query:', filterData);
    return await this.interactionSummaryService.getNumberOfContactAcc(
      filterData,
    );
  }

  @Get('/total-step-taken-accounts')
  async getNumberOfStepTakensAcc(@Query() filterData: CollectedAccFilter) {
    return await this.interactionSummaryService.getNumberOfStepTakensAcc(
      filterData,
    );
  }

  @Get('/total-staff-recommend-accounts')
  async getNumberOfStaffRecommendAcc(@Query() filterData: CollectedAccFilter) {
    return await this.interactionSummaryService.getNumberOfStaffRecommendAcc(
      filterData,
    );
  }
}
