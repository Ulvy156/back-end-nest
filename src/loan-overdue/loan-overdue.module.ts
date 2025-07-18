import { Module } from '@nestjs/common';
import { LoanOverdueService } from './loan-overdue.service';
import { LoanOverdueController } from './loan-overdue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanOverdue } from './entities/loan-overdue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanOverdue])],
  controllers: [LoanOverdueController],
  providers: [LoanOverdueService],
})
export class LoanOverdueModule {}
