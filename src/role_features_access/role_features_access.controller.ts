import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleFeaturesAccessService } from './role_features_access.service';
import { CreateRoleFeaturesAccessDto } from './dto/create-role_features_access.dto';
import { UpdateRoleFeaturesAccessDto } from './dto/update-role_features_access.dto';

@Controller('role-features-access')
export class RoleFeaturesAccessController {
  constructor(
    private readonly roleFeaturesAccessService: RoleFeaturesAccessService,
  ) {}

  @Post()
  async create(
    @Body() createRoleFeaturesAccessDto: CreateRoleFeaturesAccessDto[],
  ) {
    return await this.roleFeaturesAccessService.create(
      createRoleFeaturesAccessDto,
    );
  }

  @Get()
  findAll() {
    return this.roleFeaturesAccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleFeaturesAccessService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleFeaturesAccessDto: UpdateRoleFeaturesAccessDto,
  ) {
    return this.roleFeaturesAccessService.update(
      +id,
      updateRoleFeaturesAccessDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleFeaturesAccessService.remove(+id);
  }
}
