import { Module } from '@nestjs/common';
import { UiFeaturesService } from './ui-features.service';
import { UiFeaturesController } from './ui-features.controller';
import { UiFeature } from './entities/ui-feature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UiFeature])],
  controllers: [UiFeaturesController],
  providers: [UiFeaturesService],
})
export class UiFeaturesModule {}
