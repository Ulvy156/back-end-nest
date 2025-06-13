import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanDelinquencyModule } from './loan-delinquency/loan-delinquency.module';
import { CmlUserModule } from './cml-user/cml-user.module';
import { NotificationsModule } from './notifications/notifications.module';
import ormconfig from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import { LocationsModule } from './locations/locations.module';
import { BranchReportDashboardModule } from './branch-report-dashboard/branch-report-dashboard.module';
import { ViewBranchPermissionModule } from './view-branch-permission/view-branch-permission.module';
import { ContactAccountModule } from './contact-account/contact-account.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RecoveryTeamDashboardModule } from './recovery-team-dashboard/recovery-team-dashboard.module';
import { HpoDashboardReportModule } from './hpo-dashboard-report/hpo-dashboard-report.module';
import { LoReportDashboardModule } from './lo-report-dashboard/lo-report-dashboard.module';
import { CmpReportDashboardModule } from './cmp-report-dashboard/cmp-report-dashboard.module';
import { LoanOvedueModule } from './loan-ovedue/loan-ovedue.module';
import { JwtConfig } from './config/jwtConfig';
import { JwtMiddleware } from './middleware/jwt.middleware';
@Module({
  imports: [
    JwtConfig,
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // Time to live (seconds)
          limit: 10, // Max number of requests within ttl
        },
      ],
    }),
    TypeOrmModule.forRoot(ormconfig),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*'); // All routes
  }
}
