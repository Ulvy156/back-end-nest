import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class BranchReportDashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async getReportBranchDashboard(iuser_id: number): Promise<any> {
    try {
      const sql = `   
            SELECT 
              L.iuser_id,
              U.NAME,

              -- Previous month data
              SUM(CASE WHEN dbo.fn_IsDayInRange(L.Par_Category, 0, 0, 0, L.created_at) IS NOT NULL THEN 1 ELSE 0 END) AS pre_par_0_day,
              SUM(CASE WHEN dbo.fn_IsDayInRange(L.Par_Category, 1, 29, 0, L.created_at) IS NOT NULL THEN 1 ELSE 0 END) AS pre_par_1_29_day,
              SUM(CASE WHEN dbo.fn_IsDayInRange(L.Par_Category, 30, 59, 0, L.created_at) IS NOT NULL THEN 1 ELSE 0 END) AS pre_par_30_59_day,
              SUM(CASE WHEN dbo.fn_IsDayInRange(L.Par_Category, 60, 60000, 0, L.created_at) IS NOT NULL THEN 1 ELSE 0 END) AS pre_par_60_plus_day,

              -- Current month data
              SUM(CASE WHEN dbo.fn_IsDayInRange(L.Par_Category, 0, 0, 1, L.created_at) IS NOT NULL THEN 1 ELSE 0 END) AS cur_par_0_day,
              SUM(CASE WHEN dbo.fn_IsDayInRange(L.Par_Category, 1, 29, 1, L.created_at) IS NOT NULL THEN 1 ELSE 0 END) AS cur_par_1_29_day,
              SUM(CASE WHEN dbo.fn_IsDayInRange(L.Par_Category, 30, 59, 1, L.created_at) IS NOT NULL THEN 1 ELSE 0 END) AS cur_par_30_59_day,
              SUM(CASE WHEN dbo.fn_IsDayInRange(L.Par_Category, 60, 60000, 1, L.created_at) IS NOT NULL THEN 1 ELSE 0 END) AS cur_par_60_plus_day

            FROM CMLDLQ_loan_overdue L
            INNER JOIN USER_PROFILE_MST U ON U.IUSER_ID = L.iuser_id
            WHERE U.IUSER_ID = ${iuser_id}
            ORDER BY u.NAME
        `;
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
