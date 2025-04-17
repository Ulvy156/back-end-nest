import { PartialType } from '@nestjs/mapped-types';
import { CreateInteractionSummaryDto } from './create-interaction-summary.dto';

export class UpdateInteractionSummaryDto extends PartialType(
  CreateInteractionSummaryDto,
) {}
