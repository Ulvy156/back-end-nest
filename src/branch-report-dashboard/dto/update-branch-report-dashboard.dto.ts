import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchReportDashboardDto } from './create-branch-report-dashboard.dto';

export class UpdateBranchReportDashboardDto extends PartialType(
  CreateBranchReportDashboardDto,
) {}
