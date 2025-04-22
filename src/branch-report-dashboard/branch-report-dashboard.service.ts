import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CollectedAccFilter } from './branch-report-dashboard.interface';

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
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getColltectedAmtBranch(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAmtBranch '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  //Number of Contact Accounts (Call+Visit)
  async getNumberOfContactAcc(filterData: CollectedAccFilter) {
    try {
      filterData.br_id = filterData.br_id ?? null;
      filterData.iuser_id = filterData.iuser_id ?? null;
      const sql = `EXEC CMLDLQ_GetContactAcc '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}, ${filterData?.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  //Contact Tool
  async getNumberOfContactToolAcc(filterData: CollectedAccFilter) {
    try {
      if (!filterData.br_id) {
        filterData.br_id = null;
      }
      const sql = `EXEC CMLDLQ_GetContactToolsAcc '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}, ${filterData?.br_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
