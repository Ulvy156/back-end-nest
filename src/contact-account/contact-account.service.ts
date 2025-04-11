import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CollectedAccFilter } from 'src/branch-report-dashboard/branch-report-dashboard.interface';

@Injectable()
export class ContactAccountService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  //Number of Contact Accounts (Call+Visit)
  async getNumberOfContactAcc(filterData: CollectedAccFilter) {
    try {
      const sql = `EXEC CMLDLQ_GetContactAcc '${filterData.filterType}','${filterData.inputValue}',${filterData.iuser_id}`;
      const result: Record<string, any> = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
