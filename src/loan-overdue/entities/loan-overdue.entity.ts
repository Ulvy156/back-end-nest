import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('CMLDLQ_loan_overdue')
export class LoanOverdue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  iuser_id: number;

  @Column({ type: 'nvarchar', length: 255 })
  contact_tool: string;

  @Column({ type: 'date' })
  contact_date: Date;

  @Column({ type: 'nvarchar', length: 255 })
  staff_invole: string;

  @Column({ type: 'nvarchar', length: 255 })
  met_who: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  income_existence: string;

  @Column({ type: 'money' })
  net_income: number;

  @Column({ type: 'money' })
  current_repay_ratio: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  isPay_thisMonth: string;

  @Column({ type: 'date', nullable: true })
  promise_date: Date;

  @Column({ type: 'money', nullable: true })
  promise_amt: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  estimate_willingness: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  partner_type_default: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  reason_overdue: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  communication_step_taken: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  support_from_guarantor: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  loan_with_collateral: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  have_recheck: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  reason_not_recheck: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  status_collateral: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  outstanding_loan: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  remark_propose_solution: string;

  @Column({ type: 'nvarchar', length: 255 })
  staff_recommend: string;

  @Column({ type: 'date' })
  timeline_next_step: Date;

  @Column({ type: 'nvarchar', length: 255 })
  phone_number: string;

  @Column({ type: 'nvarchar', length: 255 })
  acc_id: string;

  @Column({ type: 'int' })
  branchID: number;

  @Column({ type: 'nvarchar', length: 10 })
  currency: string;

  @Column({ type: 'nvarchar', length: 20 })
  cus_ID: string;

  @Column({ type: 'money' })
  Balance_Amt: number;

  @Column({ type: 'date' })
  Maturity_Date: Date;

  @Column({ type: 'date' })
  Last_Payment_Date: Date;

  @Column({ type: 'money' })
  Last_Payment_Amt: number;

  @Column({ type: 'int' })
  Loan_Age: number;

  @Column({ type: 'varchar', length: 50 })
  Par_Category: string;

  @Column({ type: 'money' })
  Total_Overdue_Amt: number;

  @Column({ type: 'money' })
  Overdue_Principal: number;

  @Column({ type: 'money' })
  Overdue_Interest: number;

  @Column({ type: 'money' })
  Overdue_Monitoring_Fee: number;

  @Column({ type: 'money' })
  monthly_payment: number;

  @Column({ type: 'money' })
  Penalty: number;

  @Column({ type: 'int' })
  created_by_iuserid: number;

  @Column({ type: 'int' })
  updated_by_iuserid: number;

  @Column({ type: 'varchar', length: 50, default: 'C' })
  actions: string;

  @Column({ type: 'nvarchar', length: 50 })
  status_update: string;

  @Column({ type: 'date', nullable: true })
  created_at: Date;

  @Column({ type: 'date', nullable: true })
  updated_at: Date;
}
