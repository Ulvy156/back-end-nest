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
  created_by_iuser_id: number;
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
  acc_status: string;
}

export interface LoanOverdue {
  id: number;
  iuser_id: number;
  contact_tool: string;
  contact_date: string;
  staff_invole: string;
  met_who: string;
  income_existence: string;
  net_income: number;
  current_repay_ratio: number;
  isPay_thisMonth: string;
  promise_date: string;
  promise_amt: number;
  estimate_willingness: string;
  partner_type_default: string;
  reason_overdue: string;
  communication_step_taken: string;
  support_from_guarantor: string;
  loan_with_collateral: string;
  have_recheck: string;
  reason_not_recheck?: string | null;
  status_collateral: string;
  outstanding_loan: string;
  remark_propose_solution: string;
  staff_recommend: string;
  timeline_next_step: string;
  phone_number: string;
  acc_id: string;
  branchID: number;
  currency: string;
  cus_ID: string;
  Balance_Amt: number;
  Maturity_Date: string;
  Last_Payment_Date: string;
  Last_Payment_Amt: number;
  Loan_Age: number;
  Par_Category: string;
  Total_Overdue_Amt: number;
  Overdue_Principal: number;
  Overdue_Interest: number;
  Overdue_Monitoring_Fee: number;
  monthly_payment: number;
  Penalty: number;
  created_at: string;
  updated_at: string;
  created_by_iuserid?: number | null;
  updated_by_iuserid?: number | null;
  actions?: string | null;
  status_update?: string | null;
}
