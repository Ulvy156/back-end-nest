import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';
import { DataSource } from 'typeorm';
import { CMP_Filter } from './cmp-report-dashboard.interface';
import { combineBrIds } from 'src/common/utils/useCombineArray';

@Injectable()
export class CmpReportDashboardService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async getCollectedPARCategoryCMP(filterData: CMP_Filter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectionParBucketCMP '${filterData.filterType}','${combineBrIds(filterData.brIds)}','${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      return normalizeError(error);
    }
  }

  async getCollectedAccountCMP(filterData: CMP_Filter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAccCMP '${filterData.filterType}','${combineBrIds(filterData.brIds)}','${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      return normalizeError(error);
    }
  }

  async getCollectedAmountCMP(filterData: CMP_Filter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAmtCMP '${filterData.filterType}','${combineBrIds(filterData.brIds)}','${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      return normalizeError(error);
    }
  }
}
