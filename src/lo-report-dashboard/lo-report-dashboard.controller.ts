import { Controller, Get, Param } from '@nestjs/common';
import { LoReportDashboardService } from './lo-report-dashboard.service';

@Controller('lo-report-dashboard')
export class LoReportDashboardController {
  constructor(
    private readonly loReportDashboardService: LoReportDashboardService,
  ) {}

  @Get('/contact-tools-account/:iuser_id')
  async getContactToolsAccLO(
    @Param('iuser_id') iuser_id: number,
  ): Promise<any> {
    return await this.loReportDashboardService.getContactToolsAccLO(iuser_id);
  }

  @Get('/step-takens-account/:iuser_id')
  async getStepTakensAccLO(@Param('iuser_id') iuser_id: number): Promise<any> {
    return await this.loReportDashboardService.getStepTakensAccLO(iuser_id);
  }

  @Get('/staff-recommend-account/:iuser_id')
  async getStaffRecommendAccLO(
    @Param('iuser_id') iuser_id: number,
  ): Promise<any> {
    return await this.loReportDashboardService.getStaffRecommendAccLO(iuser_id);
  }
}
