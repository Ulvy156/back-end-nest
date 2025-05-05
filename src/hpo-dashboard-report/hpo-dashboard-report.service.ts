import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';
import { DataSource } from 'typeorm';
import { CollectedAccFilterHPO } from './hpo-dashboard-report.interface';

@Injectable()
export class HpoDashboardReportService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getCollectedAccHPO(filterData: CollectedAccFilterHPO) {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAccHPO '${filterData.filterOptions}','${filterData.inputData}', ${filterData.inputValue} ,${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
