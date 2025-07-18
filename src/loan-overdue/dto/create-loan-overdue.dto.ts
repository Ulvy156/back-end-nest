import { IsString, IsOptional, IsNumber, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLoanOverdueDto {
  @IsInt()
  iuser_id: number;

  @IsString()
  contact_tool: string;

  @Type(() => Date)
  @IsDate()
  contact_date: Date;

  @IsString()
  staff_invole: string;

  @IsString()
  met_who: string;

  @IsOptional()
  @IsString()
  income_existence?: string;

  @IsNumber()
  net_income: number;

  @IsNumber()
  current_repay_ratio: number;

  @IsOptional()
  @IsString()
  isPay_thisMonth?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  promise_date?: Date;

  @IsOptional()
  @IsNumber()
  promise_amt?: number;

  @IsOptional()
  @IsString()
  estimate_willingness?: string;

  @IsOptional()
  @IsString()
  partner_type_default?: string;

  @IsOptional()
  @IsString()
  reason_overdue?: string;

  @IsOptional()
  @IsString()
  communication_step_taken?: string;

  @IsOptional()
  @IsString()
  support_from_guarantor?: string;

  @IsOptional()
  @IsString()
  loan_with_collateral?: string;

  @IsOptional()
  @IsString()
  have_recheck?: string;

  @IsOptional()
  @IsString()
  reason_not_recheck?: string;

  @IsOptional()
  @IsString()
  status_collateral?: string;

  @IsOptional()
  @IsString()
  outstanding_loan?: string;

  @IsOptional()
  @IsString()
  remark_propose_solution?: string;

  @IsString()
  staff_recommend: string;

  @Type(() => Date)
  @IsDate()
  timeline_next_step: Date;

  @IsString()
  phone_number: string;

  @IsString()
  acc_id: string;

  @IsInt()
  branchID: number;

  @IsString()
  currency: string;

  @IsString()
  cus_ID: string;

  @IsNumber()
  Balance_Amt: number;

  @Type(() => Date)
  @IsDate()
  Maturity_Date: Date;

  @Type(() => Date)
  @IsDate()
  Last_Payment_Date: Date;

  @IsNumber()
  Last_Payment_Amt: number;

  @IsInt()
  Loan_Age: number;

  @IsString()
  Par_Category: string;

  @IsNumber()
  Total_Overdue_Amt: number;

  @IsNumber()
  Overdue_Principal: number;

  @IsNumber()
  Overdue_Interest: number;

  @IsNumber()
  Overdue_Monitoring_Fee: number;

  @IsNumber()
  monthly_payment: number;

  @IsNumber()
  Penalty: number;

  @IsOptional()
  @IsInt()
  created_by_iuserid: number;

  @IsOptional()
  @IsInt()
  updated_by_iuserid: number;

  @IsOptional()
  @IsString()
  actions?: string;

  @IsOptional()
  @IsString()
  status_update: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  created_at?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updated_at?: Date;
}
