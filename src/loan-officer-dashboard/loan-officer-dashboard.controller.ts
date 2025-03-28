import { Controller, Get, Param } from '@nestjs/common';
import { LoanOfficerDashboardService } from './loan-officer-dashboard.service';

@Controller('loan-officer-dashboard')
export class LoanOfficerDashboardController {
  constructor(
    private readonly loanOfficerDashboardService: LoanOfficerDashboardService,
  ) {}

  @Get('/contact-tools/:iuser_id')
  async countTotalContactTool(@Param('iuser_id') iuser_id: number) {
    return await this.loanOfficerDashboardService.countContactToolsByUser(
      iuser_id,
    );
  }

  @Get('/step-takens/:iuser_id')
  async countStepTakensByUser(@Param('iuser_id') iuser_id: number) {
    return await this.loanOfficerDashboardService.countStepTakensByUser(
      iuser_id,
    );
  }

  @Get('/staff-recommend/:iuser_id')
  async countStaffRecommendByUser(@Param('iuser_id') iuser_id: number) {
    return await this.loanOfficerDashboardService.countStaffRecommendByUser(
      iuser_id,
    );
  }

  @Get('/staff-recommend/:iuser_id')
  async reportCollectedAccountByUser(@Param('iuser_id') iuser_id: number) {
    return await this.loanOfficerDashboardService.reportCollectedAccountByUser(
      iuser_id,
    );
  }

  @Get('/number-contact-accounts/:iuser_id/:page')
  async getNumberOfContactByUser(
    @Param('iuser_id') iuser_id: number,
    @Param('page') page: number = 1,
  ) {
    return await this.loanOfficerDashboardService.getNumberOfContactByUser(
      iuser_id,
      page,
    );
  }
}
