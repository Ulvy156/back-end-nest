import { CmlUserService } from './../cml-user/cml-user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class LoanOfficerDashboardService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly cmlUserService: CmlUserService,
  ) {}

  async countContactToolsByUser(iuser_id: number) {
    try {
      const query = `
        SELECT 
            SUM(CASE WHEN contact_tool = 'Visit Partner' THEN 1 ELSE 0 END) AS visit_partner,
            SUM(CASE WHEN contact_tool = 'Phone Call' THEN 1 ELSE 0 END) AS phone_call,
            COUNT(contact_tool) AS grand_total
        FROM CMLDLQ_loan_overdue
        WHERE iuser_id = ${iuser_id}
      `;
      const totalContactTools: { visit_partner: number; phone_call: number }[] =
        await this.dataSource.query(query);
      return {
        success: true,
        data: totalContactTools,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async countStepTakensByUser(iuser_id: number) {
    try {
      const query = `
        SELECT 
            COUNT(CASE WHEN communication_step_taken LIKE '%Verbal communication%' THEN 1 END) AS total_verbal_communication,
            COUNT(CASE WHEN communication_step_taken LIKE '%Remind Letter%' THEN 1 END) AS total_remind_letter,
            COUNT(CASE WHEN communication_step_taken LIKE '%Follow up promise%' THEN 1 END) AS total_follow_up_promise,
            COUNT(CASE WHEN communication_step_taken LIKE '%Invitation Letter%' THEN 1 END) AS total_invitation_letter,
            COUNT(CASE WHEN communication_step_taken IS NULL THEN 1 END) AS null_value,
            COUNT(communication_step_taken) AS grand_total
        FROM CMLDLQ_loan_overdue
        WHERE iuser_id = ${iuser_id}
      `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const stepTakens = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: stepTakens,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async countStaffRecommendByUser(iuser_id: number) {
    try {
      const query = `
        SELECT 
            COUNT(CASE WHEN staff_recommend LIKE 'Remind Letter-LO%' THEN 1 END) AS total_remind_letter,
            COUNT(CASE WHEN staff_recommend LIKE 'Invitation Letter-RO%' THEN 1 END) AS total_invitation_letter,
            COUNT(CASE WHEN staff_recommend LIKE 'Contact Guarantor%' THEN 1 END) AS total_contact_guarantor,
            COUNT(CASE WHEN staff_recommend LIKE 'Contact Co-borrwer%' THEN 1 END) AS total_contact_co_borrower,
            COUNT(CASE WHEN staff_recommend LIKE 'Request BM/HLO support%' THEN 1 END) AS total_req_bm_support,
            COUNT(CASE WHEN staff_recommend LIKE 'Provide Loan Restructure%' THEN 1 END) AS total_loan_restructure,
            COUNT(CASE WHEN staff_recommend LIKE 'Provide Refinancing%' THEN 1 END) AS total_refinancing,
            COUNT(CASE WHEN staff_recommend LIKE 'Keep weekly follow up%' THEN 1 END) AS total_weekly_follow_up,
            COUNT(CASE WHEN staff_recommend IS NULL THEN 1 END) AS null_value,
            COUNT(staff_recommend) AS grand_total
        FROM CMLDLQ_loan_overdue
        WHERE iuser_id = ${iuser_id}
      `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const stepTakens = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: stepTakens,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async reportCollectedAccountByUser(iuser_id: number) {
    try {
      const query = `EXEC ReportCollectedAccount ${iuser_id}`;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const stepTakens = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: stepTakens,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getNumberOfContactByUser(iuser_id: number, page: number) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const recoveryLists: {
        USER_ID: string;
        IBR_ID: number;
        NAME: string;
        IUSER_ID: number;
        ROLE_ID: number;
      }[] = (await this.cmlUserService.getRecoveryByIuserId(iuser_id))
        .recovery_list;
      const extractROIDs = recoveryLists.map((RO) => RO.IUSER_ID);
      const query = `
        SELECT FORMAT(contact_date, 'yyyy-MM-dd') as contact_date,COUNT(*) as total, U.NAME
        FROM CMLDLQ_loan_overdue L
        INNER JOIN USER_PROFILE_MST U ON U.IUSER_ID = L.iuser_id
        WHERE L.iuser_id IN (${extractROIDs.join(',')})
        GROUP BY L.iuser_id, U.NAME, L.contact_date
        ORDER BY L.contact_date
        OFFSET ${(page - 1) * 100} ROWS FETCH NEXT 100 ROWS ONLY;
      `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const numberOfContact = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: numberOfContact,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
