import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoleFeaturesAccessDto {
  @IsNumber()
  @IsNotEmpty()
  role_id: number;

  @IsNumber()
  @IsNotEmpty()
  feature_id: number;
}
