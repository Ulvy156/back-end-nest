export type inputData =
  | 'ALL_LO'
  | 'ALL_LRO'
  | 'LO_NAME'
  | 'LRO_NAME'
  | 'ALL_STAFFS'
  | 'PSR Zone'
  | 'BTB Zone'
  | 'PNP Zone';
export type FilterOptions = 'Recovery Team' | 'Staff' | 'Branch' | 'Zone';

export interface CollectedAccFilterHPO {
  filterOptions: FilterOptions;
  inputData: inputData;
  inputValue: string;
  iuser_id: number;
  br_id?: number | null;
}
