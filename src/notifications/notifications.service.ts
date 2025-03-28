import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getUpcomingLoanDeadline(iuserId: number): Promise<any> {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 3);

      const startDateOnly = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      );
      const endDateOnly = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
      );
      const query = `
        SELECT
          id,
          timeline_next_step,
          acc_id
        FROM
          CMLDLQ_loan_overdue
        WHERE
          iuser_id = ${iuserId}
          AND timeline_next_step BETWEEN '${startDateOnly.toISOString()}' AND '${endDateOnly.toISOString()}'
      `;
      return await this.dataSource.query(query);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getPendingLoanEdit(iuserId: number): Promise<any> {
    try {
      const query = `
        SELECT COUNT(*) as count FROM CMLDLQ_request_edit_loan
        WHERE 
          is_edited = 0 AND
          iuser_id = ${iuserId}
        `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const results = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: results,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async countPendingLoanEditRequestsBM(branch_id: number) {
    try {
      const query = `
          SELECT COUNT(*) AS total_count
          FROM CMLDLQ_loan_overdue AS lo
          JOIN CMLDLQ_request_edit_loan AS rel ON rel.loan_overdue_id = lo.id
          WHERE lo.branchID = ${branch_id}
          AND rel.is_approved = 0
          AND rel.is_rejected = 0;
        `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const loans = await this.dataSource.query(query);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return loans;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
