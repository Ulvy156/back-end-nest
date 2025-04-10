import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactAccountService } from './contact-account.service';
import { CreateContactAccountDto } from './dto/create-contact-account.dto';
import { UpdateContactAccountDto } from './dto/update-contact-account.dto';

@Controller('contact-account')
export class ContactAccountController {
  constructor(private readonly contactAccountService: ContactAccountService) {}

  @Post()
  create(@Body() createContactAccountDto: CreateContactAccountDto) {
    return this.contactAccountService.create(createContactAccountDto);
  }

  @Get()
  findAll() {
    return this.contactAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactAccountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactAccountDto: UpdateContactAccountDto) {
    return this.contactAccountService.update(+id, updateContactAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactAccountService.remove(+id);
  }
}
