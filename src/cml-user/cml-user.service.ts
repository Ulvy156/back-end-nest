import { Injectable, Query } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CmlUser } from './entities/cml-user.entity';
import { DataSource } from 'typeorm';
import { FilterTypeLOLRO } from './cml-user.interface';
import { normalizeError } from 'src/common/utils/exception-utils';
import { Role } from 'src/common/enums/role.enum';

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
      throw normalizeError(error);
    }
  }

  async getWorkingDate() {
    try {
      const sql = `SELECT WORK_DT FROM BANK_MST`;
      const res: [] = await this.dataSource.query(sql);

      return { success: true, res };
    } catch (error) {
      throw normalizeError(error);
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
      throw normalizeError(error);
    }
  }

  //Get both LO LRO by iuser id
  async getOfficerLevelBranchID(iuser_id: number) {
    try {
      const sql = `
        SELECT 
          U.IUSER_ID, 
          U.NAME,
          B.BR_CD,
          U.ROLE_ID
        FROM USER_PROFILE_MST U
        JOIN BRANCH_MST B ON U.IBR_ID = B.IBR_ID
            WHERE U.IBR_ID IN (
                SELECT PERMISSION
                    FROM PERM_DTL
                    WHERE PERM_TYPE = 1004
                AND IUSERID = ${+iuser_id}
            )
        AND U.ROLE_ID IN (${[Role.LO, Role.RO].join(',')})
        AND U.STATUS <> 'D'
        ORDER BY B.BR_CD, U.NAME; 
      `;
      const res: [] = await this.dataSource.query(sql);

      return { success: true, res };
    } catch (error) {
      throw normalizeError(error);
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
      throw normalizeError(error);
    }
  }

  async getLOLROByIuserId(
    @Query() filterTypeLOLRO: FilterTypeLOLRO,
  ): Promise<any> {
    try {
      const role_ids = [32]; //default value is for other user beside manager level
      //if request user is BM the show both LO/LRO
      if ((+filterTypeLOLRO.role_id as Role) === Role.BM) {
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
      let totalUsersQuery = `
        SELECT COUNT(*) AS total_users
        FROM USER_PROFILE_MST U 
        WHERE U.IBR_ID IN (
              SELECT PERMISSION
                  FROM PERM_DTL
                  WHERE PERM_TYPE = 1004
              AND IUSERID = ${filterTypeLOLRO.searcherUserId}
          ) AND U.STATUS <> 'D' AND U.ROLE_ID IN (${role_ids.join(',')})
      `;
      const conditions: string[] = [];

      if (filterTypeLOLRO.staffId) {
        conditions.push(` AND P.EMP_NO = ${filterTypeLOLRO.staffId}`);
      }
      if (filterTypeLOLRO.userName) {
        conditions.push(
          ` AND LOWER(P.NAME) LIKE '%${filterTypeLOLRO.userName.toLowerCase()}%'`,
        );
      }
      if (filterTypeLOLRO.targetUserIdFilter) {
        conditions.push(
          ` AND P.IUSER_ID = ${filterTypeLOLRO.targetUserIdFilter}`,
        );
      }
      if (filterTypeLOLRO.userPosition) {
        conditions.push(
          ` AND LOWER(E.DESIGNATION) LIKE '%${filterTypeLOLRO.userPosition.toLowerCase()}%'`,
        );
      }
      //query 30 rows per page
      const skipRow = (+filterTypeLOLRO.page - 1) * 30;

      query += ` ${conditions.join(' ')} ORDER BY 
                      U.ID
                  OFFSET ${skipRow} ROWS FETCH NEXT 30 ROWS ONLY;`;
      totalUsersQuery += ` ${conditions.join(' ')}`;

      const [userList, totalUsers] = (await Promise.all([
        this.dataSource.query(query),
        this.dataSource.query(totalUsersQuery),
      ])) as [Record<string, any>[], { total_users: number }[]];

      return { userList, totalUsers: totalUsers[0].total_users };
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async adminFilterUsers(
    @Query() filterTypeLOLRO: FilterTypeLOLRO,
  ): Promise<any> {
    try {
      const totalUsers = `
        SELECT COUNT(*) as total_users FROM USER_PROFILE_MST U WHERE U.STATUS <> 'D'
      `;
      let query = `
        SELECT U.ID, P.ROLE_ID, U.UserID,
        P.IBR_ID, P.NAME, E.STAFF_ID, E.DESIGNATION
        FROM CML_USER U 
        INNER JOIN USER_PROFILE_MST P ON U.UserID = P.USER_ID
        INNER JOIN EMP_MST E ON E.STAFF_ID = P.EMP_NO `;

      if (filterTypeLOLRO.staffId) {
        query += ` AND P.EMP_NO = ${filterTypeLOLRO.staffId}`;
      }
      if (filterTypeLOLRO.userName) {
        query += ` AND LOWER(P.NAME) LIKE '%${filterTypeLOLRO.userName.toLowerCase()}%'`;
      }
      if (filterTypeLOLRO.targetUserIdFilter) {
        query += ` AND P.IUSER_ID = '${filterTypeLOLRO.targetUserIdFilter}'`;
      }
      if (filterTypeLOLRO.userPosition) {
        query += ` AND LOWER(E.DESIGNATION) LIKE '%${filterTypeLOLRO.userPosition.toLowerCase()}%'`;
      }
      const skipRow = (+filterTypeLOLRO.page - 1) * 30;
      //query 30 rows per page
      query += `  WHERE P.STATUS <> 'D'
                  ORDER BY 
                      U.ID
                  OFFSET ${skipRow} ROWS FETCH NEXT 30 ROWS ONLY;`;
      const userLists: Record<string, any> = await this.dataSource.query(query);
      return { userLists, totalUsers };
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
