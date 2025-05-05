import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';
import { DataSource } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async getProvinces() {
    try {
      const query = `
        SELECT * FROM PICK_LIST_DTL
        WHERE REC_TYP = 7013
        AND DEL_FLAG = 0
      `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const provinces = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: provinces,
      };
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getDistricts() {
    try {
      const query = `
        SELECT * FROM PICK_LIST_DTL
        WHERE REC_TYP = 7014
        AND DEL_FLAG = 0
      `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const districts = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: districts,
      };
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getCommunes() {
    try {
      const query = `
        SELECT * FROM PICK_LIST_DTL
        WHERE REC_TYP = 7015
        AND DEL_FLAG = 0
      `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const communes = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: communes,
      };
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async getVillages() {
    try {
      const query = `
        SELECT * FROM PICK_LIST_DTL
        WHERE REC_TYP = 7016
        AND DEL_FLAG = 0
      `;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const villages = await this.dataSource.query(query);
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: villages,
      };
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
