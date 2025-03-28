import { CmlUser } from 'src/cml-user/entities/cml-user.entity';
import { Module } from '@nestjs/common';
import { CmlUserService } from './cml-user.service';
import { CmlUserController } from './cml-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CmlUser])],
  controllers: [CmlUserController],
  providers: [CmlUserService],
  exports: [CmlUserService],
})
export class CmlUserModule {}
