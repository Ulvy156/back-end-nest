import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';
import { RecoveryFilter } from './recovery-team-dashboard.interface';
import { combineBrIds } from 'src/common/utils/useCombineArray';
@Injectable()
export class RecoveryTeamDashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getColltectedPARBucket(filterData: RecoveryFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectionParBucketROTeam '${filterData.filterType}','${combineBrIds(filterData.brIds)}', '${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getColltectedAccRecovery(filterData: RecoveryFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAccROTeam '${filterData.filterType}','${combineBrIds(filterData.brIds)}', '${filterData.zone_name}',${filterData.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getColltectedAmtRecovery(filterData: RecoveryFilter): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetCollectedAmtROTeam '${filterData.filterType}','${combineBrIds(filterData.brIds)}', '${filterData.zone_name}',${filterData.filter_iuser_id}`;
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
      const sql = `EXEC CMLDLQ_GetContactToolAccROTeam '${recoveryFilter.filterType}','${combineBrIds(recoveryFilter.brIds)}', '${recoveryFilter.zone_name}',${recoveryFilter.filter_iuser_id}`;
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
      const sql = `EXEC CMLDLQ_GetStepTakensAccROTeam '${recoveryFilter.filterType}','${combineBrIds(recoveryFilter.brIds)}', '${recoveryFilter.zone_name}',${recoveryFilter.filter_iuser_id}`;
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
      const sql = `EXEC CMLDLQ_GetStaffRecomsAccROTeam '${recoveryFilter.filterType}','${combineBrIds(recoveryFilter.brIds)}', '${recoveryFilter.zone_name}',${recoveryFilter.filter_iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
