import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBusinessExpenseDto } from './create-business-expense.dto';
import { CreateHouseholdExpenseDto } from './create-household-expense.dto';

export class CreateGrossExpenseDto {
  @IsNumber()
  loan_overdue_id: number;

  @IsOptional()
  @IsNumber()
  total_business_expense: number;

  @IsNumber()
  total_household_expense: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBusinessExpenseDto)
  business_expenses: CreateBusinessExpenseDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHouseholdExpenseDto)
  household_expenses: CreateHouseholdExpenseDto[];
}
