import { Test, TestingModule } from '@nestjs/testing';
import { CmpReportDashboardService } from './cmp-report-dashboard.service';

describe('CmpReportDashboardService', () => {
  let service: CmpReportDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmpReportDashboardService],
    }).compile();

    service = module.get<CmpReportDashboardService>(CmpReportDashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
