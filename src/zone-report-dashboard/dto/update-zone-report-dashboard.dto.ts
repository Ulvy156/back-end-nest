import { PartialType } from '@nestjs/mapped-types';
import { CreateZoneReportDashboardDto } from './create-zone-report-dashboard.dto';

export class UpdateZoneReportDashboardDto extends PartialType(CreateZoneReportDashboardDto) {}
