import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';
import { DataSource } from 'typeorm';
import { ZoneFilter } from './zone-report.interface';
import { combineBrIds } from 'src/common/utils/useCombineArray';
@Injectable()
export class ZoneReportDashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource, // Replace 'any' with the actual type if known
  ) {}

  async getContactToolZone(filterData: ZoneFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetContactToolAccZone '${filterData.filterType}','${combineBrIds(filterData.brIds)}','${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getStepTakensZone(filterData: ZoneFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetStepTakenAccZone '${filterData.filterType}','${combineBrIds(filterData.brIds)}','${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getStaffRecommendZone(filterData: ZoneFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetStaffRecommendAccZone '${filterData.filterType}','${combineBrIds(filterData.brIds)}','${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getContactAccountZone(filterData: ZoneFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetContactAccZone '${filterData.filterType}','${combineBrIds(filterData.brIds)}','${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getCollectedAccountZone(filterData: ZoneFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAccZone '${filterData.filterType}','${combineBrIds(filterData.brIds)}','${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getCollectedAmountZone(filterData: ZoneFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAmtZone '${filterData.filterType}','${combineBrIds(filterData.brIds)}','${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
