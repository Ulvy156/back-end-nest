import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';
import { DataSource } from 'typeorm';

@Injectable()
export class LoReportDashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getContactToolsAccLO(iuser_id: number = 0): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetContactToolsAccLO ${iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getStepTakensAccLO(iuser_id: number = 0): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetStepTakensAccLO ${iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getStaffRecommendAccLO(iuser_id: number = 0): Promise<any> {
    try {
      const sql = `EXEC CMLDLQ_GetStaffRecommendAccLO ${iuser_id}`;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
