import { Test, TestingModule } from '@nestjs/testing';
import { ContactAccountController } from './contact-account.controller';
import { ContactAccountService } from './contact-account.service';

describe('ContactAccountController', () => {
  let controller: ContactAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactAccountController],
      providers: [ContactAccountService],
    }).compile();

    controller = module.get<ContactAccountController>(ContactAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
