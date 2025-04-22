import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchInteractionSummaryDto } from './create-branch-interaction-summary.dto';

export class UpdateBranchInteractionSummaryDto extends PartialType(
  CreateBranchInteractionSummaryDto,
) {}
