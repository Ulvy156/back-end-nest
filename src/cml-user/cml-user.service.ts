import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CmlUser } from './entities/cml-user.entity';
import { DataSource } from 'typeorm';
import { FilterTypeLOLRO } from './cml-user.interface';

@Injectable()
export class CmlUserService {
  constructor(
    @InjectRepository(CmlUser)
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async userProfile(userId: string) {
    try {
      const sql = `
        SELECT 
            CML_USER.ID,
            CML_USER.UserID,
            USER_PROFILE_MST.NAME,
            USER_PROFILE_MST.USER_ADMIN,
            USER_PROFILE_MST.IBR_ID,
            USER_PROFILE_MST.IUSER_ID,
            USER_PROFILE_MST.ROLE_ID,
            EMP_MST.STAFF_ID,
            EMP_MST.DESIGNATION,
            BRANCH_MST.BR_NM AS BR_NAME,
            BRANCH_MST.BR_CD AS BR_CD,
            (SELECT FORMAT(WORK_DT, 'yyyy-MM-dd') FROM BANK_MST) AS WORK_DT
        FROM 
            CML_USER
        INNER JOIN 
            USER_PROFILE_MST ON CML_USER.UserID = USER_PROFILE_MST.USER_ID
        LEFT JOIN 
            EMP_MST ON USER_PROFILE_MST.EMP_NO = EMP_MST.STAFF_ID
        LEFT JOIN 
            BRANCH_MST ON USER_PROFILE_MST.IBR_ID = BRANCH_MST.IBR_ID
        WHERE 
            CML_USER.UserID = '${userId}'
            AND USER_PROFILE_MST.STATUS <> 'D';
      `;
      const result: object = await this.dataSource.query(sql);
      return { success: true, result };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getWorkingDate() {
    try {
      const sql = `SELECT WORK_DT FROM BANK_MST`;
      const res: [] = await this.dataSource.query(sql);

      return { success: true, res };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getLOByBranchID(br_id: string) {
    try {
      const sql = `
        SELECT IUSER_ID, NAME
        FROM USER_PROFILE_MST
        WHERE IBR_ID = ${br_id}
          AND ROLE_ID = 20
          AND STATUS <> 'D';
      `;
      const res: [] = await this.dataSource.query(sql);

      return { success: true, res };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getRecoveryByIuserId(iuser_id: number) {
    try {
      const query = `
        SELECT * FROM USER_PROFILE_MST
        WHERE IBR_ID IN (
            SELECT PERMISSION 
            FROM PERM_DTL 
            WHERE PERM_TYPE = 1004 
            AND IUSERID = ${iuser_id}
        )
        AND ROLE_ID = 32 
        AND STATUS <> 'D';
      `;
      const recoveryLists: Record<string, any> =
        await this.dataSource.query(query);
      return {
        success: true,
        recovery_list: recoveryLists,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getLOLROByIuserId(
    @Query() filterTypeLOLRO: FilterTypeLOLRO,
  ): Promise<any> {
    try {
      console.log(filterTypeLOLRO);
      //if request user is BM
      const role_ids = [32]; //default value is for HPO
      if (+filterTypeLOLRO.role_id === 14) {
        role_ids.push(20);
      }
      let query = `
        SELECT U.ID, P.ROLE_ID, U.UserID,
        P.IBR_ID, P.NAME, E.STAFF_ID, E.DESIGNATION
        FROM CML_USER U 
        INNER JOIN USER_PROFILE_MST P ON U.UserID = P.USER_ID
        INNER JOIN EMP_MST E ON E.STAFF_ID = P.EMP_NO
        WHERE P.IBR_ID IN (
              SELECT PERMISSION
                  FROM PERM_DTL
                  WHERE PERM_TYPE = 1004
              AND IUSERID = ${filterTypeLOLRO.searcherUserId}
          ) AND P.STATUS <> 'D' AND P.ROLE_ID IN (${role_ids.join(',')})
      `;
      if (filterTypeLOLRO.staffId) {
        query += ` AND P.EMP_NO = ${filterTypeLOLRO.staffId}`;
      }
      if (filterTypeLOLRO.userName) {
        query += ` AND LOWER(P.NAME) LIKE '%${filterTypeLOLRO.userName.toLowerCase()}%'`;
      }
      if (filterTypeLOLRO.targetUserIdFilter) {
        query += ` AND P.IUSER_ID = ${filterTypeLOLRO.targetUserIdFilter}`;
      }
      if (filterTypeLOLRO.userPosition) {
        query += ` AND LOWER(E.DESIGNATION) LIKE '%${filterTypeLOLRO.userPosition.toLowerCase()}%'`;
      }
      const skipRow = (+filterTypeLOLRO.page - 1) * 30;
      //query 30 rows per page
      query += `  ORDER BY 
                      U.ID
                  OFFSET ${skipRow} ROWS FETCH NEXT 30 ROWS ONLY;`;
      const recoveryLists: Record<string, any> =
        await this.dataSource.query(query);
      return recoveryLists;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
