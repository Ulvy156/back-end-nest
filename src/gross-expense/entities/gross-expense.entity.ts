import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BusinessExpense } from './business-expense.entity';
import { HouseholdExpense } from './household-expense.entity';

@Entity('CMLDLQ_gross_expenses')
export class GrossExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loan_overdue_id: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  total_business_expense: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  total_household_expense: number;

  @OneToMany(() => BusinessExpense, (business) => business.gross_expense)
  business_expenses: BusinessExpense[];

  @OneToMany(() => HouseholdExpense, (household) => household.gross_expense)
  household_expenses: HouseholdExpense[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
