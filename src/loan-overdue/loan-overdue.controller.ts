import { CreateLoanOverdueDto } from './dto/create-loan-overdue.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoanOverdueService } from './loan-overdue.service';
import { UpdateLoanOverdueDto } from './dto/update-loan-overdue.dto';

@Controller('loan-overdue')
export class LoanOverdueController {
  constructor(private readonly loanOverdueService: LoanOverdueService) {
    console.log('✅ LoanOverdueController loaded');
  }

  @Post()
  async create(
    @Body() createLoanOverdueDto: CreateLoanOverdueDto,
  ): Promise<any> {
    console.log('POST /loan-overdue hit with:', createLoanOverdueDto);
    return await this.loanOverdueService.create(createLoanOverdueDto);
  }

  @Get()
  findAll() {
    return this.loanOverdueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanOverdueService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoanOvedueDto: UpdateLoanOverdueDto,
  ) {
    return this.loanOverdueService.update(+id, updateLoanOvedueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanOverdueService.remove(+id);
  }
}
