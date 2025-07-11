import { PartialType } from '@nestjs/mapped-types';
import { CreateUiFeatureDto } from './create-ui-feature.dto';

export class UpdateUiFeatureDto extends PartialType(CreateUiFeatureDto) {}
