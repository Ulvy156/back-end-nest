import { CmlUser } from 'src/cml-user/entities/cml-user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('CMLDLQ_loan_overdue')
export class LoanDelinquency {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CmlUser, (user) => user.loan_overud_id, { eager: true })
  @JoinColumn({ name: 'iuser_id' })
  iuser_id: CmlUser;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  contact_tool: string;

  @Column({ type: 'date', nullable: true })
  contact_date: Date;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  staff_invole: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  met_who: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  income_existence: string;

  @Column({ type: 'money', nullable: true })
  net_income: number;

  @Column({ type: 'money', nullable: true })
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

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  staff_recommend: string;

  @Column({ type: 'date', nullable: true })
  timeline_next_step: Date;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  phone_number: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  acc_id: string;

  @Column({ type: 'int', nullable: true })
  branchID: number;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  currency: string;

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  cus_ID: string;

  @Column({ type: 'money', nullable: true })
  Balance_Amt: number;

  @Column({ type: 'date', nullable: true })
  Maturity_Date: Date;

  @Column({ type: 'date', nullable: true })
  Last_Payment_Date: Date;

  @Column({ type: 'money', nullable: true })
  Last_Payment_Amt: number;

  @Column({ type: 'int', nullable: true })
  Loan_Age: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Par_Category: string;

  @Column({ type: 'money', nullable: true })
  Total_Overdue_Amt: number;

  @Column({ type: 'money', nullable: true })
  Overdue_Principal: number;

  @Column({ type: 'money', nullable: true })
  Overdue_Interest: number;

  @Column({ type: 'money', nullable: true })
  Overdue_Monitoring_Fee: number;

  @Column({ type: 'money', nullable: true })
  monthly_payment: number;

  @Column({ type: 'money', nullable: true })
  Penalty: number;

  @Column({ type: 'date', nullable: true })
  created_at: Date;

  @Column({ type: 'date', nullable: true })
  updated_at: Date;
}
