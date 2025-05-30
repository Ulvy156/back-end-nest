import { Test, TestingModule } from '@nestjs/testing';
import { CmpReportDashboardController } from './cmp-report-dashboard.controller';
import { CmpReportDashboardService } from './cmp-report-dashboard.service';

describe('CmpReportDashboardController', () => {
  let controller: CmpReportDashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmpReportDashboardController],
      providers: [CmpReportDashboardService],
    }).compile();

    controller = module.get<CmpReportDashboardController>(CmpReportDashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
