import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
