import { Controller, Get, Query } from '@nestjs/common';
import { RecoveryTeamDashboardService } from './recovery-team-dashboard.service';
import { CollectedAccFilter } from 'src/branch-report-dashboard/branch-report-dashboard.interface';
import { RecoveryFilter } from './recovery-team-dashboard.interface';

@Controller('recovery-team-dashboard')
export class RecoveryTeamDashboardController {
  constructor(
    private readonly recoveryTeamDashboardService: RecoveryTeamDashboardService,
  ) {}

  @Get('/collected-account')
  async getColltectedAccBranch(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.recoveryTeamDashboardService.getColltectedAccRecovery(
      filterData,
    );
  }

  @Get('/collected-amount')
  async getColltectedAmtBranch(
    @Query() filterData: CollectedAccFilter,
  ): Promise<any> {
    return await this.recoveryTeamDashboardService.getColltectedAmtRecovery(
      filterData,
    );
  }

  @Get('/collected-contact-tool')
  async getColltectedContactToolRecovery(
    @Query() recoveryFilter: RecoveryFilter,
  ): Promise<any> {
    return await this.recoveryTeamDashboardService.getColltectedContactToolRecovery(
      recoveryFilter,
    );
  }

  @Get('/collected-step-taken')
  async getColltectedStepTakenRecovery(
    @Query() recoveryFilter: RecoveryFilter,
  ): Promise<any> {
    return await this.recoveryTeamDashboardService.getColltectedStepTakenRecovery(
      recoveryFilter,
    );
  }

  @Get('/collected-staff-recommend')
  async getColltectedStaffRecommendRecovery(
    @Query() recoveryFilter: RecoveryFilter,
  ): Promise<any> {
    return await this.recoveryTeamDashboardService.getColltectedStaffRecommendRecovery(
      recoveryFilter,
    );
  }
}
