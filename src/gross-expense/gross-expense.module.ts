import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrossExpenseService } from './gross-expense.service';
import { GrossExpenseController } from './gross-expense.controller';
import { GrossExpense } from './entities/gross-expense.entity';
import { BusinessExpense } from './entities/business-expense.entity';
import { HouseholdExpense } from './entities/household-expense.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GrossExpense, BusinessExpense, HouseholdExpense]),
  ],
  controllers: [GrossExpenseController],
  providers: [GrossExpenseService],
})
export class GrossExpenseModule {}
