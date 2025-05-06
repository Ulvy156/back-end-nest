import { Injectable } from '@nestjs/common';
import { LoanDelinquency } from './entities/loan-delinquency.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  FilterLoanDetails,
  FilterLoanQuery,
  FilterVillageManagement,
  LonaSavedFilterType,
} from './loan.service.interface';
import { normalizeError } from 'src/common/utils/exception-utils';

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
      throw normalizeError(error);
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
      throw normalizeError(error);
    }
  }

  async filterLoanByBranchId(filterLoanQuery: FilterLoanQuery) {
    try {
      // SQL query string with parameters
      const sql = `EXEC RPT_Loan_Overdue_CHM_2 '${filterLoanQuery.staffId}','${filterLoanQuery.currency}','${filterLoanQuery.branchId}',${filterLoanQuery.saction},'${filterLoanQuery.from_dt}','${filterLoanQuery.to_dt}',${parseInt(filterLoanQuery.day_from)},${parseInt(filterLoanQuery.day_to)},'${filterLoanQuery.acc_id}','${filterLoanQuery.cus_id}','${filterLoanQuery.cus_name}','${filterLoanQuery.LOID}','${filterLoanQuery.village}'`;

      // Execute the SQL query
      const result: [] = await this.dataSource.query(sql);

      return { success: true, data: result };
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async filterUploadedLoanOfficer(lonaSavedFilterType: LonaSavedFilterType) {
    try {
      let query = `
            SELECT 
                loan.*,
                ISNULL(cm.SURNAME_KH, '') + ' ' + ISNULL(cm.FIRSTNAME_KH, '') AS full_name_kh
            FROM 
                CMLDLQ_loan_overdue loan
            JOIN 
                CUST_MST cm ON cm.CUST_ID = loan.cus_ID
            JOIN 
                USER_PROFILE_MST U ON U.IUSER_ID = loan.iuser_id
            WHERE loan.iuser_id = ${+lonaSavedFilterType.iuser_id}
          
      `;
      let totalLoanQuery = `
        SELECT COUNT(*) as total_loan FROM CMLDLQ_loan_overdue loan
          WHERE loan.iuser_id = ${+lonaSavedFilterType.iuser_id}
      `;
      //filter base on contact date
      if (lonaSavedFilterType.promiseDate) {
        query += `AND CAST(loan.promise_date as DATE) = '${lonaSavedFilterType.promiseDate}'`;
        totalLoanQuery += `AND CAST(loan.promise_date as DATE) = '${lonaSavedFilterType.promiseDate}'`;
      }
      //base on time line next step
      if (lonaSavedFilterType.timline_next_step) {
        query += `AND CAST(loan.timeline_next_step as DATE) = '${lonaSavedFilterType.timline_next_step}'`;
        totalLoanQuery += `AND CAST(loan.timeline_next_step as DATE) = '${lonaSavedFilterType.timline_next_step}'`;
      }
      //base on promise date to pay
      if (lonaSavedFilterType.contactDate) {
        query += `AND CAST(loan.contact_date as DATE) = '${lonaSavedFilterType.contactDate}'`;
        totalLoanQuery += `AND CAST(loan.contact_date as DATE) = '${lonaSavedFilterType.contactDate}'`;
      }
      //base on met who
      if (lonaSavedFilterType.metWho) {
        query += `AND loan.met_who LIKE N'%${lonaSavedFilterType.metWho}%'`;
        totalLoanQuery += `AND loan.met_who LIKE N'%${lonaSavedFilterType.metWho}%'`;
      }
      //base on acc id
      if (lonaSavedFilterType.acc_id) {
        query += `AND loan.acc_id LIKE '%${lonaSavedFilterType.acc_id}%'`;
        totalLoanQuery += `AND loan.acc_id LIKE '%${lonaSavedFilterType.acc_id}%'`;
      }
      //query 30 rows per page
      const skipRow = (+lonaSavedFilterType.currentPage - 1) * 30;
      query += `  ORDER BY 
                  loan.id DESC
                  OFFSET ${skipRow} ROWS FETCH NEXT 30 ROWS ONLY;`;
      const result: Record<string, any> = await this.dataSource.query(query);
      //30 rows per page
      const totalLoans: { total_loan: number }[] =
        await this.dataSource.query(totalLoanQuery);
      const totalPage = Math.ceil(totalLoans[0].total_loan / 30);
      return {
        totalPage: totalPage,
        totalLoans: totalLoans[0],
        currentAcc: result,
      };
    } catch (error) {
      throw normalizeError(error);
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
      throw normalizeError(error);
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
        WHERE U.STATUS <> 'D'
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
        query += ` AND ` + conditions.join(' AND ');
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
      throw normalizeError(error);
    }
  }

  async getLoanOverdueFollowup(acc_id: string): Promise<any> {
    try {
      const sql = `  
            SELECT TOP 1  * FROM CMLDLQ_loan_overdue L 
            WHERE  L.acc_id ='${acc_id}'
            ORDER BY id DESC;`;
      const res: Record<string, any> = await this.dataSource.query(sql);
      return res[0];
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async filterUploadedLoanByECID(lonaSavedFilterType: LonaSavedFilterType) {
    try {
      let query = `
          SELECT 
              loan.*,
              ISNULL(cm.SURNAME_KH, '') + ' ' + ISNULL(cm.FIRSTNAME_KH, '') AS full_name_kh
          FROM 
              CMLDLQ_loan_overdue loan
          JOIN 
              CUST_MST cm ON cm.CUST_ID = loan.cus_ID
          JOIN 
              USER_PROFILE_MST U ON U.IUSER_ID = loan.iuser_id
          WHERE 
              loan.branchID IN (
              SELECT PERMISSION
                      FROM PERM_DTL
                      WHERE PERM_TYPE = 1004
                  AND IUSERID = ${+lonaSavedFilterType.iuser_id}
            )
        `;
      let totalLoanQuery = `
        SELECT COUNT(*) as total_loan FROM CMLDLQ_loan_overdue loan
          WHERE loan.branchID IN (
            SELECT PERMISSION
                    FROM PERM_DTL
                    WHERE PERM_TYPE = 1004
                AND IUSERID = ${+lonaSavedFilterType.iuser_id}
          )
      `;
      //filter base on contact date
      if (lonaSavedFilterType.promiseDate) {
        query += `AND CAST(loan.promise_date as DATE) = '${lonaSavedFilterType.promiseDate}'`;
        totalLoanQuery += `AND CAST(loan.promise_date as DATE) = '${lonaSavedFilterType.promiseDate}'`;
      }
      //base on time line next step
      if (lonaSavedFilterType.timline_next_step) {
        query += `AND CAST(loan.timeline_next_step as DATE) = '${lonaSavedFilterType.timline_next_step}'`;
        totalLoanQuery += `AND CAST(loan.timeline_next_step as DATE) = '${lonaSavedFilterType.timline_next_step}'`;
      }
      //base on promise date to pay
      if (lonaSavedFilterType.contactDate) {
        query += `AND CAST(loan.contact_date as DATE) = '${lonaSavedFilterType.contactDate}'`;
        totalLoanQuery += `AND CAST(loan.contact_date as DATE) = '${lonaSavedFilterType.contactDate}'`;
      }
      //base on met who
      if (lonaSavedFilterType.metWho) {
        query += `AND loan.met_who LIKE N'%${lonaSavedFilterType.metWho}%'`;
        totalLoanQuery += `AND loan.met_who LIKE N'%${lonaSavedFilterType.metWho}%'`;
      }
      //base on acc id
      if (lonaSavedFilterType.acc_id) {
        query += `AND loan.acc_id LIKE '%${lonaSavedFilterType.acc_id}%'`;
        totalLoanQuery += `AND loan.acc_id LIKE '%${lonaSavedFilterType.acc_id}%'`;
      }
      //query 30 rows per page
      const skipRow = (+lonaSavedFilterType.currentPage - 1) * 30;
      query += `  ORDER BY 
                      loan.id DESC
                  OFFSET ${skipRow} ROWS FETCH NEXT 30 ROWS ONLY;`;
      const result: Record<string, any> = await this.dataSource.query(query);
      //30 rows per page
      const totalLoans: { total_loan: number }[] =
        await this.dataSource.query(totalLoanQuery);
      const totalPage = Math.ceil(totalLoans[0].total_loan / 30);
      return {
        totalPage: totalPage,
        totalLoans: totalLoans[0],
        currentAcc: result,
      };
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
