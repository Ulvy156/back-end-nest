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
  br_id: number;
}

export interface CollectedAccBARFilter {
  iuser_id: number;
  filterType: FilterType;
  filterValue: string;
  inputData: string | number;
  filter_iuser_id: number;
}
