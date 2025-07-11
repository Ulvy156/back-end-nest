import { Injectable } from '@nestjs/common';
import { CreateRoleFeaturesAccessDto } from './dto/create-role_features_access.dto';
import { UpdateRoleFeaturesAccessDto } from './dto/update-role_features_access.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleFeaturesAccess } from './entities/role_features_access.entity';
import { Repository } from 'typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';

@Injectable()
export class RoleFeaturesAccessService {
  constructor(
    @InjectRepository(RoleFeaturesAccess)
    private readonly roleFeatureAccessRepo: Repository<RoleFeaturesAccess>,
  ) {}
  async create(createRoleFeaturesAccessDto: CreateRoleFeaturesAccessDto[]) {
    try {
      return await this.roleFeatureAccessRepo.upsert(
        createRoleFeaturesAccessDto,
        ['role_id', 'feature_id'],
      );
    } catch (error) {
      throw normalizeError(error);
    }
  }

  findAll() {
    return `This action returns all roleFeaturesAccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleFeaturesAccess`;
  }

  update(id: number, updateRoleFeaturesAccessDto: UpdateRoleFeaturesAccessDto) {
    return `This action updates a #${id} roleFeaturesAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleFeaturesAccess`;
  }
}
