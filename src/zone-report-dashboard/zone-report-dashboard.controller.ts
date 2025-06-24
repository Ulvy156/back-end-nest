import { Controller, Get, Query } from '@nestjs/common';
import { ZoneReportDashboardService } from './zone-report-dashboard.service';
import { CollectedAccFilter } from './zone-report.interface';

@Controller('zone-report-dashboard')
export class ZoneReportDashboardController {
  constructor(
    private readonly zoneReportDashboardService: ZoneReportDashboardService,
  ) {}

  @Get('/contact-tool')
  async getContactToolZone(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.zoneReportDashboardService.getContactToolZone(filterData);
  }

  @Get('/step-takens')
  async getStepTakensZone(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.zoneReportDashboardService.getStepTakensZone(filterData);
  }

  @Get('/staff-recommend')
  async getStaffRecommendZone(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.zoneReportDashboardService.getStaffRecommendZone(
      filterData,
    );
  }
}
