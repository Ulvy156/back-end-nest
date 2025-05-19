import { PartialType } from '@nestjs/mapped-types';
import { CreateLoReportDashboardDto } from './create-lo-report-dashboard.dto';

export class UpdateLoReportDashboardDto extends PartialType(
  CreateLoReportDashboardDto,
) {}
