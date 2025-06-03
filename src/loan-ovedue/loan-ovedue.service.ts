import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanOverdueDto } from './dto/create-loan-overdue.dto';
import { UpdateLoanOvedueDto } from './dto/update-loan-ovedue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CMLDLQ_loan_overdue } from './entities/loan-ovedue.entity';

@Injectable()
export class LoanOvedueService {
  constructor(
    @InjectRepository(CMLDLQ_loan_overdue)
    private readonly loanOverdueRepository: Repository<CMLDLQ_loan_overdue>,
  ) {}
  async create(
    createLoanOvedueDto: CreateLoanOverdueDto,
  ): Promise<CMLDLQ_loan_overdue> {
    const loanOverdue = this.loanOverdueRepository.create(createLoanOvedueDto);
    return await this.loanOverdueRepository.save(loanOverdue);
  }

  async findAll() {
    return this.loanOverdueRepository.find();
  }

  async findOne(id: number): Promise<CMLDLQ_loan_overdue> {
    const loanOverdue = await this.loanOverdueRepository.findOne({
      where: { id },
    });
    if (!loanOverdue) {
      throw new NotFoundException(`LoanOverdue with ID ${id} not found`);
    }
    return loanOverdue;
  }

  async update(id: number, updateLoanOvedueDto: UpdateLoanOvedueDto) {
    const loanOverdue = await this.findOne(+id);
    if (!loanOverdue) {
      throw new NotFoundException(`LoanOverdue with ID ${id} not found`);
    }
    Object.assign(loanOverdue, updateLoanOvedueDto);
    return this.loanOverdueRepository.save(loanOverdue);
  }

  async remove(id: number) {
    const loanOverdue = await this.findOne(+id);
    if (!loanOverdue) {
      throw new NotFoundException(`LoanOverdue with ID ${id} not found`);
    }
    return this.loanOverdueRepository.remove(loanOverdue);
  }
}
