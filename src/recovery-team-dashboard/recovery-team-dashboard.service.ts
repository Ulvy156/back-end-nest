import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  CollectedAccBARFilter,
  CollectedAccFilter,
} from 'src/branch-report-dashboard/branch-report-dashboard.interface';
import { DataSource } from 'typeorm';
import { RecoveryFilter } from './recovery-team-dashboard.interface';
import { normalizeError } from 'src/common/utils/exception-utils';

@Injectable()
export class RecoveryTeamDashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getColltectedPARBucket(
    filterData: CollectedAccBARFilter,
  ): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectionParBucketROTeam '${filterData.iuser_id}','${filterData.filterType}',${filterData.filterValue},'${filterData.inputData}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getColltectedAccRecovery(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAccRecovery '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getColltectedAmtRecovery(filterData: CollectedAccFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAmtRecovery '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
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
      throw normalizeError(error);
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
      throw normalizeError(error);
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
      throw normalizeError(error);
    }
  }
}
