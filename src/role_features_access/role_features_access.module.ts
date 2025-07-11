import { Module } from '@nestjs/common';
import { RoleFeaturesAccessService } from './role_features_access.service';
import { RoleFeaturesAccessController } from './role_features_access.controller';
import { RoleFeaturesAccess } from './entities/role_features_access.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleFeaturesAccess])],
  controllers: [RoleFeaturesAccessController],
  providers: [RoleFeaturesAccessService],
})
export class RoleFeaturesAccessModule {}
