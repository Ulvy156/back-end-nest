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

  @Get('/collected-account')
  async getCollectedAccountCMP(@Query() filterData: CMP_Filter): Promise<any> {
    return await this.cmpReportDashboardService.getCollectedAccountCMP(
      filterData,
    );
  }

  @Get('/collected-amount')
  async getCollectedAmountCMP(@Query() filterData: CMP_Filter): Promise<any> {
    return await this.cmpReportDashboardService.getCollectedAmountCMP(
      filterData,
    );
  }
}
