import { Injectable } from '@nestjs/common';
import { CreateContactAccountDto } from './dto/create-contact-account.dto';
import { UpdateContactAccountDto } from './dto/update-contact-account.dto';

@Injectable()
export class ContactAccountService {
  create(createContactAccountDto: CreateContactAccountDto) {
    return 'This action adds a new contactAccount';
  }

  findAll() {
    return `This action returns all contactAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactAccount`;
  }

  update(id: number, updateContactAccountDto: UpdateContactAccountDto) {
    return `This action updates a #${id} contactAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactAccount`;
  }
}
