import { PartialType } from '@nestjs/mapped-types';
import { CreateViewBranchPermissionDto } from './create-view-branch-permission.dto';

export class UpdateViewBranchPermissionDto extends PartialType(
  CreateViewBranchPermissionDto,
) {}
