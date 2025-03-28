import { Module } from '@nestjs/common';
import { LoanDelinquencyService } from './loan-delinquency.service';
import { LoanDelinquencyController } from './loan-delinquency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanDelinquency } from './entities/loan-delinquency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanDelinquency])],
  controllers: [LoanDelinquencyController],
  providers: [LoanDelinquencyService],
})
export class LoanDelinquencyModule {}
