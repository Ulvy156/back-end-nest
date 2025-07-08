import { RecoveryFilter } from './../recovery-team-dashboard/recovery-team-dashboard.interface';

export type FilterType =
  | 'ALL_LO'
  | 'ALL_LRO'
  | 'LO_NAME'
  | 'LRO_NAME'
  | 'ALL_STAFFS';

export interface ZoneFilter extends RecoveryFilter {
  staff: string;
}
