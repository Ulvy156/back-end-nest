type FilterOptions = 'Staff' | 'Branch' | 'Zone' | 'Recovery Team' | 'CMP';
export type Zones = 'PNP' | 'SRP' | 'BTB';

export type FilterType =
  | 'ALL_LO'
  | 'ALL_LRO'
  | 'LO_NAME'
  | 'LRO_NAME'
  | 'ALL_STAFFS';

export interface CMP_Filter {
  filterType: FilterOptions;
  brIds: Array<number>;
  zone_name: Zones;
  filter_iuser_id: number;
}
