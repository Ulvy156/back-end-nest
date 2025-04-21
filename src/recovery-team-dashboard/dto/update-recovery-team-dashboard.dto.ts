import { PartialType } from '@nestjs/mapped-types';
import { CreateRecoveryTeamDashboardDto } from './create-recovery-team-dashboard.dto';

export class UpdateRecoveryTeamDashboardDto extends PartialType(
  CreateRecoveryTeamDashboardDto,
) {}
