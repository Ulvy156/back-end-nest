import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CMLDLQ_loan_overdue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  iuser_id: number;

  @Column({ type: 'nvarchar' })
  contact_tool: string;

  @Column({ type: 'date' })
  contact_date: string;

  @Column({ type: 'nvarchar' })
  staff_invole: string;

  @Column({ type: 'nvarchar' })
  met_who: string;

  @Column({ type: 'nvarchar' })
  income_existence: string;

  @Column({ type: 'float' })
  net_income: number;

  @Column({ type: 'float' })
  current_repay_ratio: number;

  @Column({ type: 'nvarchar' })
  isPay_thisMonth: string;

  @Column({ type: 'date', nullable: true })
  promise_date: string | null;

  @Column({ type: 'float', nullable: true })
  promise_amt: number | null;

  @Column({ type: 'nvarchar' })
  estimate_willingness: string;

  @Column({ type: 'nvarchar' })
  partner_type_default: string;

  @Column({ type: 'nvarchar' })
  reason_overdue: string;

  @Column({ type: 'nvarchar' })
  communication_step_taken: string;

  @Column({ type: 'nvarchar' })
  support_from_guarantor: string;

  @Column({ type: 'nvarchar' })
  loan_with_collateral: string;

  @Column({ type: 'nvarchar' })
  have_recheck: string;

  @Column({ type: 'nvarchar', nullable: true })
  reason_not_recheck: string | null;

  @Column({ type: 'nvarchar' })
  status_collateral: string;

  @Column({ type: 'nvarchar' })
  outstanding_loan: string;

  @Column({ type: 'nvarchar' })
  remark_propose_solution: string;

  @Column({ type: 'nvarchar' })
  staff_recommend: string;

  @Column({ type: 'date' })
  timeline_next_step: string;

  @Column({ type: 'nvarchar' })
  phone_number: string;

  @Column({ type: 'nvarchar' })
  acc_id: string;

  @Column({ type: 'int' })
  branchID: number;

  @Column({ type: 'nvarchar' })
  currency: string;

  @Column({ type: 'nvarchar' })
  cus_ID: string;

  @Column({ type: 'float' })
  Balance_Amt: number;

  @Column({ type: 'date' })
  Maturity_Date: string;

  @Column({ type: 'date' })
  Last_Payment_Date: string;

  @Column({ type: 'float' })
  Last_Payment_Amt: number;

  @Column({ type: 'int' })
  Loan_Age: number;

  @Column({ type: 'nvarchar' })
  Par_Category: string;

  @Column({ type: 'float' })
  Total_Overdue_Amt: number;

  @Column({ type: 'float' })
  Overdue_Principal: number;

  @Column({ type: 'float' })
  Overdue_Interest: number;

  @Column({ type: 'float' })
  Overdue_Monitoring_Fee: number;

  @Column({ type: 'float' })
  monthly_payment: number;

  @Column({ type: 'float' })
  Penalty: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: string;

  @Column({ type: 'nvarchar' })
  status_update: string;

  @Column({ type: 'int' })
  created_by_iuserid: number;

  @Column({ type: 'int', nullable: true })
  updated_by_iuserid: number | null;

  @Column({ type: 'nvarchar' })
  actions: string;
}
