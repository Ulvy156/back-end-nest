import { Controller, Get, Param, Query } from '@nestjs/common';
import { LoanDelinquencyService } from './loan-delinquency.service';
import {
  FilterLoanDetails,
  FilterLoanQuery,
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
    @Query() filterLoanQuery: FilterLoanQuery,
  ): Promise<any> {
    const result =
      await this.loanDelinquencyService.filterLoanByBranchId(filterLoanQuery);

    return result;
  }

  @Get('/filter-uploaded-loan-officer')
  async filterUploadedLoanOfficer(
    @Query() query: LonaSavedFilterType,
  ): Promise<any> {
    return await this.loanDelinquencyService.filterUploadedLoanOfficer(query);
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
