import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CollectedAccFilter } from 'src/branch-report-dashboard/branch-report-dashboard.interface';
import { DataSource } from 'typeorm';
import { RecoveryFilter } from './recovery-team-dashboard.interface';

@Injectable()
export class RecoveryTeamDashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getColltectedAccRecovery(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAccRecovery '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getColltectedAmtRecovery(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAmtRecovery '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getColltectedContactToolRecovery(
    recoveryFilter: RecoveryFilter,
  ): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetContactToolsAccRecoveryDB '${recoveryFilter.filterType}','${recoveryFilter.inputValue}','${recoveryFilter.ROName}',${recoveryFilter.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getColltectedStepTakenRecovery(
    recoveryFilter: RecoveryFilter,
  ): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetTotalStepTakenAccRecoveryDB '${recoveryFilter.filterType}','${recoveryFilter.inputValue}','${recoveryFilter.ROName}',${recoveryFilter.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getColltectedStaffRecommendRecovery(
    recoveryFilter: RecoveryFilter,
  ): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetTotalStaffRecommendAccRecoveryDB '${recoveryFilter.filterType}','${recoveryFilter.inputValue}','${recoveryFilter.ROName}',${recoveryFilter.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
