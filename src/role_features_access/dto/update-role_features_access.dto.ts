import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleFeaturesAccessDto } from './create-role_features_access.dto';

export class UpdateRoleFeaturesAccessDto extends PartialType(
  CreateRoleFeaturesAccessDto,
) {}
