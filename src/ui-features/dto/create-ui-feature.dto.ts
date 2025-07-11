import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUiFeatureDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_removed?: boolean;
}
