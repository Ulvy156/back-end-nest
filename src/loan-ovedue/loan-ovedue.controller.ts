import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoanOvedueService } from './loan-ovedue.service';
import { CreateLoanOverdueDto } from './dto/create-loan-overdue.dto';
import { UpdateLoanOvedueDto } from './dto/update-loan-ovedue.dto';

@Controller('loan-ovedue')
export class LoanOvedueController {
  constructor(private readonly loanOvedueService: LoanOvedueService) {}

  @Post()
  async create(
    @Body() createLoanOvedueDto: CreateLoanOverdueDto,
  ): Promise<any> {
    return await this.loanOvedueService.create(createLoanOvedueDto);
  }

  @Get()
  findAll() {
    return this.loanOvedueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanOvedueService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoanOvedueDto: UpdateLoanOvedueDto,
  ) {
    return this.loanOvedueService.update(+id, updateLoanOvedueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanOvedueService.remove(+id);
  }
}
