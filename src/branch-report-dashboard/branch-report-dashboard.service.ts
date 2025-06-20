import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CollectedAccFilter } from './branch-report-dashboard.interface';
import { normalizeError } from 'src/common/utils/exception-utils';

@Injectable()
export class BranchReportDashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getColltectedAccBranch(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAccBranch '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getColltectedAmtBranch(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAmtBranch '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  //Number of Contact Accounts (Call+Visit)
  async getNumberOfContactAcc(filterData: CollectedAccFilter) {
    try {
      const sql = `EXEC CMLDLQ_GetContactAccBranch '${filterData.filterType}','${filterData.inputValue}', ${filterData.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  //Contact Tool
  async getNumberOfContactToolAcc(filterData: CollectedAccFilter) {
    try {
      const sql = `EXEC CMLDLQ_GetContactToolsAccBM '${filterData.filterType}','${filterData.inputValue}', ${filterData.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  //Number of step takens Accounts
  async getNumberOfStepTakensAcc(filterData: CollectedAccFilter) {
    try {
      const sql = `EXEC CMLDLQ_GetStepTakensAccBM '${filterData.filterType}','${filterData.inputValue}', ${filterData.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  //Number of step takens Accounts
  async getNumberOfStaffRecommendAcc(filterData: CollectedAccFilter) {
    try {
      const sql = `EXEC CMLDLQ_GetStaffRecommendAccBM '${filterData.filterType}','${filterData.inputValue}', ${filterData.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
