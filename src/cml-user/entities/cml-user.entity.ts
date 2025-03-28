import { LoanDelinquency } from 'src/loan-delinquency/entities/loan-delinquency.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CML_USER')
export class CmlUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, unique: true })
  userID: string;

  @Column({ type: 'varchar', length: 500 })
  password: string;

  @OneToMany(() => LoanDelinquency, (loan) => loan.iuser_id)
  loan_overud_id: LoanDelinquency[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
