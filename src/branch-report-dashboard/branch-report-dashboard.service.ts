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
}
