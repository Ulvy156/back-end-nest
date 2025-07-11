import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UiFeaturesService } from './ui-features.service';
import { CreateUiFeatureDto } from './dto/create-ui-feature.dto';
import { UpdateUiFeatureDto } from './dto/update-ui-feature.dto';

@Controller('ui-features')
export class UiFeaturesController {
  constructor(private readonly uiFeaturesService: UiFeaturesService) {}

  @Post()
  async create(@Body() createUiFeatureDto: CreateUiFeatureDto) {
    return await this.uiFeaturesService.create(createUiFeatureDto);
  }

  @Get()
  async findAll() {
    return await this.uiFeaturesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.uiFeaturesService.findOne(+id);
  }

  @Get('/status/:status')
  async findFeatureByStatus(@Param('status') status: boolean) {
    return await this.uiFeaturesService.findFeatureByStatus(status);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUiFeatureDto: UpdateUiFeatureDto,
  ) {
    return await this.uiFeaturesService.update(+id, updateUiFeatureDto);
  }

  @Patch('/restore/:id')
  async restore(@Param('id', ParseIntPipe) id: string) {
    return await this.uiFeaturesService.restore(+id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.uiFeaturesService.remove(+id);
  }
}
