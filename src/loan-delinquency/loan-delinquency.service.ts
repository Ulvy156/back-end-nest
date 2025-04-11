import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoanDelinquency } from './entities/loan-delinquency.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  FilterLoanDetails,
  FilterUploadedLoanQuery,
  FilterVillageManagement,
} from './loan.service.interface';

@Injectable()
export class LoanDelinquencyService {
  constructor(
    @InjectRepository(LoanDelinquency)
    private readonly loanDelinquencyRepository: Repository<LoanDelinquency>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<LoanDelinquency[]> {
    try {
      return await this.loanDelinquencyRepository.find({
        order: {
          id: 'DESC',
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchLoanRecoveryDataForEC(
    branchID: string = '0',
    staffID: string = '0',
    fromDate: string | null = 'NULL',
    toDate: string | null = 'NULL',
    roleID: string | null = null,
  ) {
    try {
      // SQL query string with parameters properly inserted
      const sql = `EXEC View_InterfaceRecovery_Sup '${branchID}','${staffID}','${roleID}','${fromDate}','${toDate}'`;
      // Execute the SQL query using TypeORM
      const result: Record<string, any>[] = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async filterLoanByBranchId(
    staffId: string,
    currency: string = '0',
    branchId: string = '',
    saction: number = 1,
    fromDt: string = '',
    toDt: string = '',
    daysFrom: string = '0',
    daysTo: string = '0',
    accountId: string = '',
    custId: string = '',
    custName: string = '',
    LOID: string = '',
    village: string = '',
  ) {
    try {
      // SQL query string with parameters
      const sql = `EXEC RPT_Loan_Overdue_CHM_2 '${staffId}','${currency}','${branchId}',${saction},'${fromDt}','${toDt}',${parseInt(daysFrom)},${parseInt(daysTo)},'${accountId}','${custId}','${custName}','${LOID}','${village}'`;

      // Execute the SQL query
      const result: [] = await this.dataSource.query(sql);

      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async filterUploadedLoan(request: FilterUploadedLoanQuery) {
    try {
      const userId = request.user_id;
      const promiseDate = request.promiseDate || '';
      const timelineNextStep = request.timelineNextStep || '';
      const contactDate = request.contactDate || '';
      const metWho = request.metWho || '';

      let query = `
                SELECT
          CMLDLQ_loan_overdue.*,
          CONCAT(CUST_MST.SURNAME_KH, ' ', CUST_MST.FIRSTNAME_KH) AS full_name_kh
        FROM
          CMLDLQ_loan_overdue
        INNER JOIN
          CUST_MST ON CUST_MST.CUST_ID = CMLDLQ_loan_overdue.cus_ID
        WHERE
          CMLDLQ_loan_overdue.iuser_id = '${userId}'
      `;
      // Add filters if they are present
      if (promiseDate) {
        query += ` AND promise_date LIKE '${promiseDate}'`;
      }
      if (timelineNextStep) {
        query += ` AND timeline_next_step LIKE '${timelineNextStep}'`;
      }
      if (contactDate) {
        query += ` AND contact_date LIKE '${contactDate}'`;
      }
      if (metWho) {
        query += ` AND met_who LIKE '${metWho}'`;
      }

      query += ' ORDER BY CMLDLQ_loan_overdue.id DESC';
      const result: [] = await this.dataSource.query(query);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async filterUploadedLoanRO(query: FilterUploadedLoanQuery) {
    try {
      const {
        brID,
        promiseDate,
        timelineNextStep,
        contactDate,
        metWho,
        user_id,
        offset = 0,
      } = query;

      let sql = `
        SELECT
          CMLDLQ_loan_overdue.*,
          CONCAT(CUST_MST.SURNAME_KH, ' ', CUST_MST.FIRSTNAME_KH) AS full_name_kh
        FROM
          CMLDLQ_loan_overdue
        INNER JOIN
          CUST_MST ON CUST_MST.CUST_ID = CMLDLQ_loan_overdue.cus_ID
        WHERE
          CMLDLQ_loan_overdue.branchID = '${brID}'
      `;

      // Add filters based on query parameters
      if (promiseDate) {
        sql += ` AND promise_date LIKE '%${promiseDate}%'`;
      }

      if (timelineNextStep) {
        sql += ` AND timeline_next_step LIKE '%${timelineNextStep}%'`;
      }

      if (contactDate) {
        sql += ` AND contact_date LIKE '%${contactDate}%'`;
      }

      if (metWho) {
        sql += ` AND met_who LIKE '%${metWho}%'`;
      }

      sql += ` 
        OR CMLDLQ_loan_overdue.iuser_id = '${user_id}' ORDER BY CMLDLQ_loan_overdue.id DESC
        OFFSET ${offset} ROWS FETCH NEXT 30 ROWS ONLY;
        `;

      // Execute the SQL query with parameters
      const result: [] = await this.dataSource.query(sql);

      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async viewLoanDetails(req: FilterLoanDetails) {
    try {
      const query = `
          EXEC VIEW_LOAN_OVERDUE 
          @Staff_ID = '${req.staffId}',
          @BR = '${req.branchId}',
          @ACC_ID = '${req.accId}'
        `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: res,
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async geVillageUnderROManage(req: FilterVillageManagement): Promise<any> {
    try {
      let query = `
        SELECT
            (SELECT TOP 1 PL.DESCRIPTION
            FROM PICK_LIST_DTL PL
            WHERE PL.REC_TYP = 7013
            AND LEFT(R.village_code, 2) = LEFT(PL.REF_CODE, 2)) AS province_name,

            (SELECT TOP 1 PL.DESCRIPTION
            FROM PICK_LIST_DTL PL
            WHERE PL.REC_TYP = 7014
            AND LEFT(R.village_code, 4) = LEFT(PL.REF_CODE, 4)) AS district_name,

            (SELECT TOP 1 PL.DESCRIPTION
            FROM PICK_LIST_DTL PL
            WHERE PL.REC_TYP = 7015
            AND LEFT(R.village_code, 6) = LEFT(PL.REF_CODE, 6)) AS commune_name,

            P.DESCRIPTION AS village_name,
            U.NAME,
            U.IBR_ID,
            B.BR_NM AS branch_name,
            B.BR_CD AS branch_cd,
            R.village_code
        FROM CMLDLQ_RO_village_management AS R
        LEFT JOIN USER_PROFILE_MST AS U ON R.iuser_id = U.IUSER_ID
        JOIN PICK_LIST_DTL AS P ON R.village_code = P.REF_CODE
        JOIN BRANCH_MST AS B ON B.IBR_ID = U.IBR_ID
      `;
      // Initialize an array to hold the conditions
      const conditions: Array<string> = [];

      // Add conditions dynamically based on the request parameters
      if (req.br_id) {
        conditions.push(`B.IBR_ID = '${req.br_id}'`);
      }
      if (req.iuser_id) {
        conditions.push(`R.iuser_id = '${req.iuser_id}'`);
      }

      // If there are conditions, append them to the query
      if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
      }
      query += ` ORDER BY U.IUSER_ID DESC `;
      //execute query
      const totalAccounts: [] = await this.dataSource.query(query);
      // != 1 is meant user want to export all data
      if (req.is_export != 1) {
        query += ` OFFSET (${parseInt(req.page.toString())} - 1) * 100 ROWS FETCH NEXT 100 ROWS ONLY`;
      }
      const res: Array<Record<string, any>> =
        await this.dataSource.query(query);
      //get last page for pagination
      const lastPage = Math.ceil(totalAccounts.length / 100);

      return {
        success: true,

        data: res,
        total: totalAccounts.length,
        lastPage: lastPage,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  // async geVillageUnderROManage(req: FilterVillageManagement): Promise<any> {
  //   try {
  //     // EXEC GetVillageDetails  @br_id, @iuser_id, @is_export, @page;
  //     const query = `EXEC GetVillageDetails ${req.br_id ?? null}, ${req.iuser_id ?? null}, ${req.is_export}, ${req.page}`;
  //     const totalAccounts: [] = await this.dataSource.query(query);

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     const res = await this.dataSource.query(query);
  //     const lastPage = Math.ceil(totalAccounts.length / 100);

  //     return {
  //       success: true,
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //       data: res,
  //       total: totalAccounts.length,
  //       lastPage: lastPage,
  //     };
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
