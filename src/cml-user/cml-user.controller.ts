import { Controller, Get, Param, Query } from '@nestjs/common';
import { CmlUserService } from './cml-user.service';
import { FilterTypeLOLRO } from './cml-user.interface';

@Controller('cml-user')
export class CmlUserController {
  constructor(private readonly cmlUserService: CmlUserService) {}

  @Get('/profile/:userId')
  async userProfile(@Param('userId') userId: string) {
    return await this.cmlUserService.userProfile(userId);
  }

  @Get('/loan-officer/:br_id')
  async getLOByBranchID(@Param('br_id') br_id: string) {
    return await this.cmlUserService.getLOByBranchID(br_id);
  }

  @Get('/working-date')
  async getWorkingDate() {
    return await this.cmlUserService.getWorkingDate();
  }

  @Get('/recovery-lists/:iuser_id')
  async getRecoveryByIuserId(@Param('iuser_id') iuser_id: number) {
    return await this.cmlUserService.getRecoveryByIuserId(+iuser_id);
  }

  @Get('/recovery-loan-officer-lists')
  async getLOLROByIuserid(
    @Query() filterTypeLOLRO: FilterTypeLOLRO,
  ): Promise<any> {
    return await this.cmlUserService.getLOLROByIuserId(filterTypeLOLRO);
  }
}
