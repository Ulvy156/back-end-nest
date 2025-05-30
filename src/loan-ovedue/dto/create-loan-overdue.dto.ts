import {
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateLoanOverdueDto {
  @IsInt()
  iuser_id: number;

  @IsString()
  contact_tool: string;

  @IsDateString()
  contact_date: string;

  @IsString()
  staff_invole: string;

  @IsString()
  met_who: string;

  @IsString()
  income_existence: string;

  @IsNumber()
  net_income: number;

  @IsNumber()
  current_repay_ratio: number;

  @IsString()
  isPay_thisMonth: string;

  @IsDateString()
  @IsOptional()
  promise_date: string | null;

  @IsNumber()
  @IsOptional()
  promise_amt: number | null;

  @IsString()
  estimate_willingness: string;

  @IsString()
  partner_type_default: string;

  @IsString()
  reason_overdue: string;

  @IsString()
  communication_step_taken: string;

  @IsString()
  support_from_guarantor: string;

  @IsString()
  loan_with_collateral: string;

  @IsString()
  have_recheck: string;

  @IsString()
  @IsOptional()
  reason_not_recheck: string | null;

  @IsString()
  status_collateral: string;

  @IsString()
  outstanding_loan: string;

  @IsString()
  remark_propose_solution: string;

  @IsString()
  staff_recommend: string;

  @IsDateString()
  timeline_next_step: string;

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

  @IsDateString()
  Maturity_Date: string;

  @IsDateString()
  Last_Payment_Date: string;

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

  @IsDateString()
  created_at: string;

  @IsDateString()
  updated_at: string;

  @IsString()
  status_update: string;

  @IsInt()
  created_by_iuserid: number;

  @IsInt()
  @IsOptional()
  updated_by_iuserid: number | null;

  @IsString()
  actions: string;
}
