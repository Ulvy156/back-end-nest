import { Injectable } from '@nestjs/common';
import { CreateUiFeatureDto } from './dto/create-ui-feature.dto';
import { UpdateUiFeatureDto } from './dto/update-ui-feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UiFeature } from './entities/ui-feature.entity';
import { Repository } from 'typeorm';
import { normalizeError } from 'src/common/utils/exception-utils';

@Injectable()
export class UiFeaturesService {
  constructor(
    @InjectRepository(UiFeature)
    private readonly uiFeatureRepo: Repository<UiFeature>,
  ) {}

  async create(createUiFeatureDto: CreateUiFeatureDto): Promise<UiFeature> {
    try {
      const feature = this.uiFeatureRepo.create(createUiFeatureDto);
      return await this.uiFeatureRepo.save(feature);
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async findAll(): Promise<UiFeature[]> {
    return await this.uiFeatureRepo.find({
      order: { id: 'DESC' },
    });
  }

  async findFeatureByStatus(status: boolean): Promise<UiFeature[]> {
    return await this.uiFeatureRepo.find({
      where: { is_removed: status },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    return await this.uiFeatureRepo.findOneOrFail({
      where: { id },
    });
  }

  async update(id: number, updateUiFeatureDto: UpdateUiFeatureDto) {
    try {
      const feature = await this.findOne(id);
      const mergeData = this.uiFeatureRepo.merge(feature, updateUiFeatureDto);
      return await this.uiFeatureRepo.save(mergeData);
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async restore(id: number) {
    try {
      const feature = await this.findOne(id);
      feature.is_removed = false;
      return await this.uiFeatureRepo.save(feature);
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async remove(id: number) {
    try {
      const feature = await this.findOne(id);
      feature.is_removed = true;
      return await this.uiFeatureRepo.save(feature);
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
