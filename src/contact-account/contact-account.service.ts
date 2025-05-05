import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CollectedAccFilter } from 'src/branch-report-dashboard/branch-report-dashboard.interface';
import { normalizeError } from 'src/common/utils/exception-utils';

@Injectable()
export class ContactAccountService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  //Number of Contact Accounts (Call+Visit)
  async getNumberOfContactAcc(filterData: CollectedAccFilter) {
    try {
      filterData.br_id = filterData.br_id ?? null;
      filterData.iuser_id = filterData.iuser_id ?? null;
      const sql = `EXEC CMLDLQ_GetContactAcc '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}, ${filterData?.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
