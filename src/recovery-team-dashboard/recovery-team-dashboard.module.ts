import { Module } from '@nestjs/common';
import { RecoveryTeamDashboardService } from './recovery-team-dashboard.service';
import { RecoveryTeamDashboardController } from './recovery-team-dashboard.controller';

@Module({
  controllers: [RecoveryTeamDashboardController],
  providers: [RecoveryTeamDashboardService],
})
export class RecoveryTeamDashboardModule {}
