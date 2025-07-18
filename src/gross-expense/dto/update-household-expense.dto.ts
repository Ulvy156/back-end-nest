import { PartialType } from '@nestjs/mapped-types';
import { CreateGrossExpenseDto } from './create-gross-expense.dto';

export class UpdateGrossExpenseDto extends PartialType(CreateGrossExpenseDto) {}
