import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDelinquencyDto } from './create-loan-delinquency.dto';

export class UpdateLoanDelinquencyDto extends PartialType(
  CreateLoanDelinquencyDto,
) {}
