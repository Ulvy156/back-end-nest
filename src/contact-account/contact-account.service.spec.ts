import { Test, TestingModule } from '@nestjs/testing';
import { ContactAccountService } from './contact-account.service';

describe('ContactAccountService', () => {
  let service: ContactAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactAccountService],
    }).compile();

    service = module.get<ContactAccountService>(ContactAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
