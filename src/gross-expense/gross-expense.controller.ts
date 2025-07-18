import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { GrossExpenseService } from './gross-expense.service';
import { CreateGrossExpenseDto } from './dto/create-gross-expense.dto';

@Controller('gross-expense')
export class GrossExpenseController {
  constructor(private readonly service: GrossExpenseService) {}

  @Post()
  create(@Body() dto: CreateGrossExpenseDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
