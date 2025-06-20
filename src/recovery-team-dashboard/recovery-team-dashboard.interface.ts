export type FilterType = 'BRANCH' | 'LRO_NAME Name';
export interface RecoveryFilter {
  filterType: FilterType;
  brIds: Array<number>;
  filter_iuser_id: number;
}
