export interface FilterUploadedLoanQuery {
  user_id: string;
  promiseDate: string;
  timelineNextStep: string;
  contactDate: string;
  metWho: string;
  page: number;
  brID: string;
  offset: number;
  rows: number;
}

export interface FilterLoanDetails {
  staffId: string;
  branchId: string;
  accId: string;
}

export interface FilterVillageManagement {
  br_id: string;
  iuser_id: string;
  is_export: number;
  page: number;
}

export interface LonaSavedFilterType {
  promiseDate: string;
  timline_next_step: string;
  contactDate: string;
  metWho: string;
  iuser_id: number;
  currentPage: number;
  acc_id: string;
  role_id: number;
}

export interface FilterLoanQuery {
  staffId: string;
  currency: string;
  branchId: string;
  saction: number;
  from_dt: string;
  to_dt: string;
  day_from: string;
  day_to: string;
  acc_id: string;
  cus_id: string;
  cus_name: string;
  LOID: string;
  village: string;
}
