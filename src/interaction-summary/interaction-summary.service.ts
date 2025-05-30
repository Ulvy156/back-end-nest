import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CollectedAccFilter } from 'src/branch-report-dashboard/branch-report-dashboard.interface';
import { normalizeError } from 'src/common/utils/exception-utils';
import { DataSource } from 'typeorm';

@Injectable()
export class InteractionSummaryService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  //Number of Contact Accounts (Call+Visit)
  async getNumberOfContactAcc(filterData: CollectedAccFilter) {
    try {
      if (!filterData.br_id) {
        filterData.br_id = null;
      }
      const sql = `EXEC CMLDLQ_GetContactToolsAcc '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}, ${filterData?.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  //Number of step takens Accounts
  async getNumberOfStepTakensAcc(filterData: CollectedAccFilter) {
    try {
      if (!filterData.br_id) {
        filterData.br_id = null;
      }
      const sql = `EXEC CMLDLQ_GetStepTakensAcc '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}, ${filterData?.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  //Number of step takens Accounts
  async getNumberOfStaffRecommendAcc(filterData: CollectedAccFilter) {
    try {
      if (!filterData.br_id) {
        filterData.br_id = null;
      }
      const sql = `EXEC CMLDLQ_GetStaffRecommendAcc '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}, ${filterData?.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
