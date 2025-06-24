import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';
import { DataSource } from 'typeorm';
import { CollectedAccFilter } from './zone-report.interface';

@Injectable()
export class ZoneReportDashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource, // Replace 'any' with the actual type if known
  ) {}

  async getContactToolZone(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAccBranch '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getStepTakensZone(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAmtBranch '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getStaffRecommendZone(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAmtBranch '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
