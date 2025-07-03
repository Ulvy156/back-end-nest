import { Controller, Get, Query } from '@nestjs/common';
import { CmpReportDashboardService } from './cmp-report-dashboard.service';
import { CMP_Filter } from './cmp-report-dashboard.interface';

@Controller('cmp-report-dashboard')
export class CmpReportDashboardController {
  constructor(
    private readonly cmpReportDashboardService: CmpReportDashboardService,
  ) {}

  @Get('/collected-par-category')
  async getCollectedPARCategoryCMP(
    @Query() filterData: CMP_Filter,
  ): Promise<any> {
    return await this.cmpReportDashboardService.getCollectedPARCategoryCMP(
      filterData,
    );
  }

  @Get('/account-loan')
  async getCollectedAccountCMP(@Query() filterData: CMP_Filter): Promise<any> {
    return await this.cmpReportDashboardService.getCollectedAccountCMP(
      filterData,
    );
  }

  @Get('/volume-loan')
  async getCollectedAmountCMP(@Query() filterData: CMP_Filter): Promise<any> {
    return await this.cmpReportDashboardService.getCollectedAmountCMP(
      filterData,
    );
  }
}
