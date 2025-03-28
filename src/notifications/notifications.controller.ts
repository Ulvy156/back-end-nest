import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('loan-overdue')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/upcoming-loan-time-line/:iuser_id')
  getUpcomingLoanDeadline(@Param('iuser_id') iuser_id: string) {
    return this.notificationsService.getUpcomingLoanDeadline(+iuser_id);
  }

  @Get('/pendign-loan-edit/:iuser_id')
  getPendingLoanEdit(@Param('iuser_id') iuser_id: string) {
    return this.notificationsService.getPendingLoanEdit(+iuser_id);
  }

  @Get('/pendign-loan-edit-BM/:branch_id')
  countPendingLoanEditRequestsBM(@Param('branch_id') branch_id: string) {
    return this.notificationsService.countPendingLoanEditRequestsBM(+branch_id);
  }
}
