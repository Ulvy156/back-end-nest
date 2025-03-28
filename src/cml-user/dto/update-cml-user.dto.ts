import { PartialType } from '@nestjs/mapped-types';
import { CreateCmlUserDto } from './create-cml-user.dto';

export class UpdateCmlUserDto extends PartialType(CreateCmlUserDto) {}
