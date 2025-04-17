import { Module } from '@nestjs/common';
import { InteractionSummaryService } from './interaction-summary.service';
import { InteractionSummaryController } from './interaction-summary.controller';

@Module({
  controllers: [InteractionSummaryController],
  providers: [InteractionSummaryService],
})
export class InteractionSummaryModule {}
