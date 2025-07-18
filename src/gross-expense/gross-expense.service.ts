import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { GrossExpense } from './entities/gross-expense.entity';
import { BusinessExpense } from './entities/business-expense.entity';
import { HouseholdExpense } from './entities/household-expense.entity';
import { CreateGrossExpenseDto } from './dto/create-gross-expense.dto';

@Injectable()
export class GrossExpenseService {
  constructor(
    @InjectRepository(GrossExpense)
    private grossRepo: Repository<GrossExpense>,

    @InjectRepository(BusinessExpense)
    private businessRepo: Repository<BusinessExpense>,

    @InjectRepository(HouseholdExpense)
    private householdRepo: Repository<HouseholdExpense>,
  ) {}

  async create(dto: CreateGrossExpenseDto) {
    const gross = this.grossRepo.create({
      loan_overdue_id: dto.loan_overdue_id,
      total_business_expense: dto.total_business_expense,
      total_household_expense: dto.total_household_expense,
    });

    const savedGross = await this.grossRepo.save(gross);

    if (dto.business_expenses?.length) {
      const business = this.businessRepo.create(
        dto.business_expenses.map((b) => ({
          ...b,
          gross_expense: savedGross,
        })) as DeepPartial<BusinessExpense>[],
      );
      await this.businessRepo.save(business);
    }

    if (dto.household_expenses?.length) {
      const household = this.householdRepo.create(
        dto.household_expenses.map((h) => ({
          ...h,
          gross_expense: savedGross,
        })) as DeepPartial<HouseholdExpense>[],
      );
      await this.householdRepo.save(household);
    }

    return savedGross;
  }

  async findAll() {
    return this.grossRepo.find({
      relations: ['business_expenses', 'household_expenses'],
    });
  }

  async findOne(id: number) {
    return this.grossRepo.findOne({
      where: { id },
      relations: ['business_expenses', 'household_expenses'],
    });
  }

  async remove(id: number) {
    return this.grossRepo.delete(id);
  }
}
