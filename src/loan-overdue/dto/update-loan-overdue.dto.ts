import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanOverdueDto } from './create-loan-overdue.dto';

export class UpdateLoanOverdueDto extends PartialType(CreateLoanOverdueDto) {}
