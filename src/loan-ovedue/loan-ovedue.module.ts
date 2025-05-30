import { Module } from '@nestjs/common';
import { LoanOvedueService } from './loan-ovedue.service';
import { LoanOvedueController } from './loan-ovedue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CMLDLQ_loan_overdue } from './entities/loan-ovedue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CMLDLQ_loan_overdue])],
  controllers: [LoanOvedueController],
  providers: [LoanOvedueService],
})
export class LoanOvedueModule {}
