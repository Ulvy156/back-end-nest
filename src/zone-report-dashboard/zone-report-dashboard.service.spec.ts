import { Test, TestingModule } from '@nestjs/testing';
import { ZoneReportDashboardService } from './zone-report-dashboard.service';

describe('ZoneReportDashboardService', () => {
  let service: ZoneReportDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZoneReportDashboardService],
    }).compile();

    service = module.get<ZoneReportDashboardService>(ZoneReportDashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
