import { Controller } from '@nestjs/common';
import { CmpReportDashboardService } from './cmp-report-dashboard.service';

@Controller('cmp-report-dashboard')
export class CmpReportDashboardController {
  constructor(private readonly cmpReportDashboardService: CmpReportDashboardService) {}
}
