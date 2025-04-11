import { Controller, Get, Query } from '@nestjs/common';
import { ContactAccountService } from './contact-account.service';
import { CollectedAccFilter } from 'src/branch-report-dashboard/branch-report-dashboard.interface';

@Controller('contact-account')
export class ContactAccountController {
  constructor(private readonly contactAccountService: ContactAccountService) {}

  @Get()
  async getNumberOfContactAcc(@Query() filterData: CollectedAccFilter) {
    return await this.contactAccountService.getNumberOfContactAcc(filterData);
  }
}
