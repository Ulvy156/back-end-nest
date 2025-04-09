import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanDelinquencyModule } from './loan-delinquency/loan-delinquency.module';
import { CmlUserModule } from './cml-user/cml-user.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';
import ormconfig from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import { LocationsModule } from './locations/locations.module';
import { BranchReportDashboardModule } from './branch-report-dashboard/branch-report-dashboard.module';
import { ViewBranchPermissionModule } from './view-branch-permission/view-branch-permission.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    LoanDelinquencyModule,
    CmlUserModule,
    AuthModule,
    UserModule,
    NotificationsModule,
    LocationsModule,
    BranchReportDashboardModule,
    ViewBranchPermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
