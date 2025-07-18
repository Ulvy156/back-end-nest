import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GrossExpense } from './gross-expense.entity';

@Entity('CMLDLQ_household_expense')
export class HouseholdExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expense_items: string;

  @Column()
  expense_item_name: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amt_expense: number;

  @ManyToOne(() => GrossExpense, (gross) => gross.household_expenses, {
    onDelete: 'CASCADE',
  })
  gross_expense: GrossExpense;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
