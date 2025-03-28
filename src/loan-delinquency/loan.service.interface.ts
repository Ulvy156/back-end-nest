/* eslint-disable prettier/prettier */
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
