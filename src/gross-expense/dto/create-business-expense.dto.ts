import { IsNumber, IsString } from 'class-validator';

export class CreateBusinessExpenseDto {
  @IsString()
  expense_items: string;

  @IsNumber()
  amt_expense: number;

  @IsNumber()
  gross_expense_id: number;
}
