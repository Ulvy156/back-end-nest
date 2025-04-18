import { Controller, Get, Param } from '@nestjs/common';
import { ViewBranchPermissionService } from './view-branch-permission.service';

@Controller('view-branch-permission')
export class ViewBranchPermissionController {
  constructor(
    private readonly viewBranchPermissionService: ViewBranchPermissionService,
  ) {}

  @Get('/:iuser_id')
  async viewBranchesPermissionByIuserID(
    @Param('iuser_id') iuser_id: number,
  ): Promise<Array<number>> {
    return await this.viewBranchPermissionService.viewBranchesPermissionByIuserID(
      +iuser_id,
    );
  }

  @Get('/branch-info/:iuser_id')
  async getBrnachByBrID(@Param('iuser_id') iuser_id: number) {
    return await this.viewBranchPermissionService.getBrnachByBrID(+iuser_id);
  }
}
