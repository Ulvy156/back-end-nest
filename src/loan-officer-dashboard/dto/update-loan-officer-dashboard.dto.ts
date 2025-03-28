import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanOfficerDashboardDto } from './create-loan-officer-dashboard.dto';

export class UpdateLoanOfficerDashboardDto extends PartialType(
  CreateLoanOfficerDashboardDto,
) {}
