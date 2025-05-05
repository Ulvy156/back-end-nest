import { Controller } from '@nestjs/common';
import { HpoDashboardReportService } from './hpo-dashboard-report.service';

@Controller('hpo-dashboard-report')
export class HpoDashboardReportController {
  constructor(
    private readonly hpoDashboardReportService: HpoDashboardReportService,
  ) {}
}
