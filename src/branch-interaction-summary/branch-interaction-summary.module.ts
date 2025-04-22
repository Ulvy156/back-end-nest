import { Module } from '@nestjs/common';
import { BranchInteractionSummaryService } from './branch-interaction-summary.service';
import { BranchInteractionSummaryController } from './branch-interaction-summary.controller';

@Module({
  controllers: [BranchInteractionSummaryController],
  providers: [BranchInteractionSummaryService],
})
export class BranchInteractionSummaryModule {}
