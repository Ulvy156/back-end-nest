type FilterOptions = 'Staff' | 'Branch' | 'Zone' | 'Recovery Team' | 'CMP';

export interface CmpReportInterface {
  filterOption: FilterOptions;
  valueOption: number;
}
