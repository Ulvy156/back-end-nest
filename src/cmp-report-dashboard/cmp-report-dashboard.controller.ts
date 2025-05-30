import { Controller } from '@nestjs/common';
import { CmpReportDashboardService } from './cmp-report-dashboard.service';
import { CmpReportInterface } from './cmp-report-dashboard.interface';

@Controller('cmp-report-dashboard')
export class CmpReportDashboardController {
  constructor(
    private readonly cmpReportDashboardService: CmpReportDashboardService,
  ) {}

  async getCollectedAccountCMP(filterData: CmpReportInterface): Promise<any> {
    return await this.cmpReportDashboardService.getCollectedAccountCMP(
      filterData,
    );
  }
}
