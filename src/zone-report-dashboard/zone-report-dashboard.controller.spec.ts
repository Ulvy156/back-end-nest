import { Test, TestingModule } from '@nestjs/testing';
import { ZoneReportDashboardController } from './zone-report-dashboard.controller';
import { ZoneReportDashboardService } from './zone-report-dashboard.service';

describe('ZoneReportDashboardController', () => {
  let controller: ZoneReportDashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZoneReportDashboardController],
      providers: [ZoneReportDashboardService],
    }).compile();

    controller = module.get<ZoneReportDashboardController>(ZoneReportDashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
