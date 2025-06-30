// src/app-imports.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/config.module';
import ormconfig from 'ormconfig';
import { AppThrottlerModule } from './throttler/throttler.module';
import { JwtConfig } from './config/jwtConfig';
console.log('ORM CONFIG', ormconfig);
// All feature modules
import { LoanDelinquencyModule } from './loan-delinquency/loan-delinquency.module';
import { CmlUserModule } from './cml-user/cml-user.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LocationsModule } from './locations/locations.module';
import { BranchReportDashboardModule } from './branch-report-dashboard/branch-report-dashboard.module';
import { ViewBranchPermissionModule } from './view-branch-permission/view-branch-permission.module';
import { ContactAccountModule } from './contact-account/contact-account.module';
import { RecoveryTeamDashboardModule } from './recovery-team-dashboard/recovery-team-dashboard.module';
import { HpoDashboardReportModule } from './hpo-dashboard-report/hpo-dashboard-report.module';
import { LoReportDashboardModule } from './lo-report-dashboard/lo-report-dashboard.module';
import { CmpReportDashboardModule } from './cmp-report-dashboard/cmp-report-dashboard.module';
import { LoanOvedueModule } from './loan-ovedue/loan-ovedue.module';
import { ZoneReportDashboardModule } from './zone-report-dashboard/zone-report-dashboard.module';
@Module({
  imports: [
    AppConfigModule,
    JwtConfig,
    AppThrottlerModule,
    TypeOrmModule.forRoot(ormconfig),
    // Grouped features
    LoanDelinquencyModule,
    CmlUserModule,
    NotificationsModule,
    LocationsModule,
    BranchReportDashboardModule,
    ViewBranchPermissionModule,
    ContactAccountModule,
    RecoveryTeamDashboardModule,
    HpoDashboardReportModule,
    LoReportDashboardModule,
    CmpReportDashboardModule,
    LoanOvedueModule,
    ZoneReportDashboardModule,
  ],
})
export class AppImportsModule {}
