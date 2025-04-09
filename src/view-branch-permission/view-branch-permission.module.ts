import { Module } from '@nestjs/common';
import { ViewBranchPermissionService } from './view-branch-permission.service';
import { ViewBranchPermissionController } from './view-branch-permission.controller';

@Module({
  controllers: [ViewBranchPermissionController],
  providers: [ViewBranchPermissionService],
  exports: [ViewBranchPermissionService],
})
export class ViewBranchPermissionModule {}
