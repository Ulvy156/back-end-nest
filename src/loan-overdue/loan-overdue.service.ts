import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLoanOverdueDto } from './dto/update-loan-overdue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanOverdue } from './entities/loan-overdue.entity';
import { CreateLoanOverdueDto } from './dto/create-loan-overdue.dto';
import { normalizeError } from 'src/common/utils/exception-utils';

@Injectable()
export class LoanOverdueService {
  constructor(
    @InjectRepository(LoanOverdue)
    private readonly loanOverdueRepository: Repository<LoanOverdue>,
  ) {}

  async create(createLoanOverdueDto: CreateLoanOverdueDto) {
    try {
      const loanOverdue =
        this.loanOverdueRepository.create(createLoanOverdueDto);
      return await this.loanOverdueRepository.save(loanOverdue);
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async findAll() {
    return this.loanOverdueRepository.find();
  }

  async findOne(id: number): Promise<LoanOverdue> {
    const loanOverdue = await this.loanOverdueRepository.findOne({
      where: { id },
    });
    if (!loanOverdue) {
      throw new NotFoundException(`LoanOverdue with ID ${id} not found`);
    }
    return loanOverdue;
  }

  async update(id: number, updateLoanOvedueDto: UpdateLoanOverdueDto) {
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
