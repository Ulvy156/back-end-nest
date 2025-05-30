import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';
import { DataSource } from 'typeorm';
import { CmpReportInterface } from './cmp-report-dashboard.interface';

@Injectable()
export class CmpReportDashboardService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async getCollectedAccountCMP(filterData: CmpReportInterface): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetStaffRecommendAccLO ${filterData.filterOption}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      return normalizeError(error);
    }
  }
}
