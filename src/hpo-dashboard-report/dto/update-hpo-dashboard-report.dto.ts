import { PartialType } from '@nestjs/mapped-types';
import { CreateHpoDashboardReportDto } from './create-hpo-dashboard-report.dto';

export class UpdateHpoDashboardReportDto extends PartialType(
  CreateHpoDashboardReportDto,
) {}
