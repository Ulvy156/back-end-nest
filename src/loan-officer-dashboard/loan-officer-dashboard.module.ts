import { Module } from '@nestjs/common';
import { LoanOfficerDashboardService } from './loan-officer-dashboard.service';
import { LoanOfficerDashboardController } from './loan-officer-dashboard.controller';
import { CmlUserModule } from 'src/cml-user/cml-user.module';

@Module({
  imports: [CmlUserModule],
  controllers: [LoanOfficerDashboardController],
  providers: [LoanOfficerDashboardService],
})
export class LoanOfficerDashboardModule {}
