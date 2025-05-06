import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';
import { DataSource } from 'typeorm';

@Injectable()
export class ViewBranchPermissionService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async viewBranchesPermissionByIuserID(
    iuser_id: number,
  ): Promise<Array<number>> {
    try {
      const sql = `
        SELECT PERMISSION
          FROM PERM_DTL
          WHERE PERM_TYPE = 1004
        AND IUSERID = ${iuser_id};
      `;
      const result: Array<{ PERMISSION: number }> =
        await this.dataSource.query(sql);
      const converToArrStr = result.map((item) => item.PERMISSION);
      return converToArrStr;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getBrnachByBrID(iuser_id: number) {
    try {
      const brIds = await this.viewBranchesPermissionByIuserID(iuser_id);
      const sql = `
        SELECT 
          B.IBR_ID,
          B.BR_NM,
          BR_CD
        FROM BRANCH_MST B
        WHERE B.IBR_ID IN (${brIds.join(',')})          
      `;
      const branches: Record<string, any> = await this.dataSource.query(sql);
      return { branches };
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
