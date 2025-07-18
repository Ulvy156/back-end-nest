import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GrossExpense } from './gross-expense.entity';

@Entity('CMLDLQ_business_expense')
export class BusinessExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expense_items: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amt_expense: number;

  @ManyToOne(() => GrossExpense, (gross) => gross.business_expenses, {
    onDelete: 'CASCADE',
  })
  gross_expense: GrossExpense;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
