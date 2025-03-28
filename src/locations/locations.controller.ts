import { Controller, Get } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('/provinces')
  async getProvinces() {
    return await this.locationsService.getProvinces();
  }

  @Get('/districts')
  async getDistricts() {
    return await this.locationsService.getDistricts();
  }

  @Get('/communes')
  async getCommunes() {
    return await this.locationsService.getCommunes();
  }

  @Get('/villages')
  async getVillages() {
    return await this.locationsService.getVillages();
  }
}
