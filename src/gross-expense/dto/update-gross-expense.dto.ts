import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseholdExpenseDto } from './create-household-expense.dto';

export class UpdateHouseholdExpenseDto extends PartialType(
  CreateHouseholdExpenseDto,
) {}
