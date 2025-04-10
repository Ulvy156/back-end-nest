import { Module } from '@nestjs/common';
import { ContactAccountService } from './contact-account.service';
import { ContactAccountController } from './contact-account.controller';

@Module({
  controllers: [ContactAccountController],
  providers: [ContactAccountService],
})
export class ContactAccountModule {}
