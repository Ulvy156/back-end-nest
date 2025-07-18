import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessExpenseDto } from './create-business-expense.dto';

export class UpdateBusinessExpenseDto extends PartialType(
  CreateBusinessExpenseDto,
) {}
