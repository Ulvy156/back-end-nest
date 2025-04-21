import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanDelinquencyModule } from './loan-delinquency/loan-delinquency.module';
import { CmlUserModule } from './cml-user/cml-user.module';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';
import ormconfig from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import { LocationsModule } from './locations/locations.module';
import { BranchReportDashboardModule } from './branch-report-dashboard/branch-report-dashboard.module';
import { ViewBranchPermissionModule } from './view-branch-permission/view-branch-permission.module';
import { ContactAccountModule } from './contact-account/contact-account.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { InteractionSummaryModule } from './interaction-summary/interaction-summary.module';
import { RecoveryTeamDashboardModule } from './recovery-team-dashboard/recovery-team-dashboard.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // Time to live (seconds)
          limit: 10, // Max number of requests within ttl
        },
      ],
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    LoanDelinquencyModule,
    CmlUserModule,
    UserModule,
    NotificationsModule,
    LocationsModule,
    BranchReportDashboardModule,
    ViewBranchPermissionModule,
    ContactAccountModule,
    InteractionSummaryModule,
    RecoveryTeamDashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
