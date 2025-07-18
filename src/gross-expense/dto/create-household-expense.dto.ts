import { IsNumber, IsString } from 'class-validator';

export class CreateHouseholdExpenseDto {
  @IsString()
  expense_items: string;

  @IsString()
  expense_item_name: string;

  @IsNumber()
  amt_expense: number;

  @IsNumber()
  gross_expense_id: number;
}
