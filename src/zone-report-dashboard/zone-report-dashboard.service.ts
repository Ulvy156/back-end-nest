import { Injectable } from '@nestjs/common';
import { CreateZoneReportDashboardDto } from './dto/create-zone-report-dashboard.dto';
import { UpdateZoneReportDashboardDto } from './dto/update-zone-report-dashboard.dto';

@Injectable()
export class ZoneReportDashboardService {
  create(createZoneReportDashboardDto: CreateZoneReportDashboardDto) {
    return 'This action adds a new zoneReportDashboard';
  }

  findAll() {
    return `This action returns all zoneReportDashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zoneReportDashboard`;
  }

  update(id: number, updateZoneReportDashboardDto: UpdateZoneReportDashboardDto) {
    return `This action updates a #${id} zoneReportDashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} zoneReportDashboard`;
  }
}
