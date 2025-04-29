import { Controller, Get, Param, Query } from '@nestjs/common';
import { LoanDelinquencyService } from './loan-delinquency.service';
import {
  FilterLoanDetails,
  FilterUploadedLoanQuery,
  FilterVillageManagement,
  LonaSavedFilterType,
} from './loan.service.interface';

@Controller('loan-delinquency')
export class LoanDelinquencyController {
  constructor(
    private readonly loanDelinquencyService: LoanDelinquencyService,
  ) {}
  @Get()
  findAll() {
    return this.loanDelinquencyService.findAll();
  }

  @Get('/interfae-recovery')
  async getLoanRecovery(
    @Query('branchID') branchID: string = '0',
    @Query('staffID') staffID: string = '0',
    @Query('fromDate') fromDate: string | null = null,
    @Query('toDate') toDate: string | null = null,
    @Query('roleID') roleID: string | null = null,
  ) {
    const data = await this.loanDelinquencyService.fetchLoanRecoveryDataForEC(
      branchID,
      staffID,
      fromDate,
      toDate,
      roleID,
    );
    return {
      data,
      message: 'Loan recovery data fetched successfully',
    };
  }
  @Get('/recovery-loans-overdue')
  async filterLoanByBranchId(
    @Query('staffId') staffId: string,
    @Query('currency') currency: string,
    @Query('branchId') branchId: string,
    @Query('saction') saction: number,
    @Query('from_dt') fromDate: string,
    @Query('to_dt') toDate: string,
    @Query('day_from') daysFrom: string,
    @Query('day_to') daysTo: string,
    @Query('acc_id') accountId: string,
    @Query('cus_id') custId: string,
    @Query('cus_name') custName: string,
    @Query('LOID') LOID: string,
    @Query('village') village: string,
  ): Promise<any> {
    const result = await this.loanDelinquencyService.filterLoanByBranchId(
      staffId,
      currency,
      branchId,
      saction,
      fromDate,
      toDate,
      daysFrom,
      daysTo,
      accountId,
      custId,
      custName,
      LOID,
      village,
    );

    return result;
  }

  @Get('/filter-uploaded-loan')
  async filterUploadedLoan(
    @Query() query: FilterUploadedLoanQuery,
  ): Promise<any> {
    return await this.loanDelinquencyService.filterUploadedLoan(query);
  }

  @Get('/filter-uploaded-loan-recovery')
  async filterUploadedLoanRO(
    @Query() query: FilterUploadedLoanQuery,
  ): Promise<any> {
    return await this.loanDelinquencyService.filterUploadedLoanRO(query);
  }

  @Get('/view-loan-details')
  async viewLoanDetails(@Query() query: FilterLoanDetails): Promise<any> {
    return await this.loanDelinquencyService.viewLoanDetails(query);
  }

  @Get('/village-under-recovery-manage')
  async geVillageUnderROManage(
    @Query() query: FilterVillageManagement,
  ): Promise<any> {
    return await this.loanDelinquencyService.geVillageUnderROManage(query);
  }

  @Get('/follow-up-loan/BM-filter')
  async filterUploadedLoanByBMID(
    @Query() lonaSavedFilterType: LonaSavedFilterType,
  ): Promise<any> {
    return await this.loanDelinquencyService.filterUploadedLoanByECID(
      lonaSavedFilterType,
    );
  }

  @Get('/follow-up-loan/:accId')
  async getLoanOverdueFollowup(@Param('accId') accId: string): Promise<any> {
    return await this.loanDelinquencyService.getLoanOverdueFollowup(accId);
  }
}
