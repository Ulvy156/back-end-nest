export type FilterType =
  | 'ALL_LO'
  | 'ALL_LRO'
  | 'LO_NAME'
  | 'LRO_NAME'
  | 'ALL_STAFFS';

export interface CollectedAccFilter {
  filterType: FilterType;
  inputValue: string;
  iuser_id: number;
  br_id?: number;
}
