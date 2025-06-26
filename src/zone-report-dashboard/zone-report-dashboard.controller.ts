import { Controller, Get, Query } from '@nestjs/common';
import { ZoneReportDashboardService } from './zone-report-dashboard.service';
import { ZoneFilter } from './zone-report.interface';

@Controller('zone-report-dashboard')
export class ZoneReportDashboardController {
  constructor(
    private readonly zoneReportDashboardService: ZoneReportDashboardService,
  ) {}

  @Get('/contact-tool')
  async getContactToolZone(@Query() filterData: ZoneFilter): Promise<any> {
    return await this.zoneReportDashboardService.getContactToolZone(filterData);
  }

  @Get('/step-takens')
  async getStepTakensZone(@Query() filterData: ZoneFilter): Promise<any> {
    return await this.zoneReportDashboardService.getStepTakensZone(filterData);
  }

  @Get('/staff-recommend')
  async getStaffRecommendZone(@Query() filterData: ZoneFilter): Promise<any> {
    return await this.zoneReportDashboardService.getStaffRecommendZone(
      filterData,
    );
  }

  @Get('/contact-account')
  async getContactAccountZone(@Query() filterData: ZoneFilter): Promise<any> {
    return await this.zoneReportDashboardService.getContactAccountZone(
      filterData,
    );
  }

  @Get('/collected-account')
  async getCollectedAccountZone(@Query() filterData: ZoneFilter): Promise<any> {
    return await this.zoneReportDashboardService.getCollectedAccountZone(
      filterData,
    );
  }

  @Get('/collected-amount')
  async getCollectedAmountZone(@Query() filterData: ZoneFilter): Promise<any> {
    return await this.zoneReportDashboardService.getCollectedAmountZone(
      filterData,
    );
  }
}
