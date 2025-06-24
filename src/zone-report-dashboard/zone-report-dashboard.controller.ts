import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZoneReportDashboardService } from './zone-report-dashboard.service';
import { CreateZoneReportDashboardDto } from './dto/create-zone-report-dashboard.dto';
import { UpdateZoneReportDashboardDto } from './dto/update-zone-report-dashboard.dto';

@Controller('zone-report-dashboard')
export class ZoneReportDashboardController {
  constructor(private readonly zoneReportDashboardService: ZoneReportDashboardService) {}

  @Post()
  create(@Body() createZoneReportDashboardDto: CreateZoneReportDashboardDto) {
    return this.zoneReportDashboardService.create(createZoneReportDashboardDto);
  }

  @Get()
  findAll() {
    return this.zoneReportDashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zoneReportDashboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZoneReportDashboardDto: UpdateZoneReportDashboardDto) {
    return this.zoneReportDashboardService.update(+id, updateZoneReportDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zoneReportDashboardService.remove(+id);
  }
}
