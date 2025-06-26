export type FilterType = 'BRANCH' | 'LRO Name';
export interface RecoveryFilter {
  filterType: FilterType;
  brIds: Array<number>;
  zone_name: string;
  filter_iuser_id: number;
}
