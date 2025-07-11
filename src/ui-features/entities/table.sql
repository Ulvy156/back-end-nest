

CREATE TABLE CMLDLQ_Features (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(100) NOT NULL UNIQUE,
  description NVARCHAR(255) NULL,
  is_removed BIT DEFAULT(0),
  created_at DATETIME DEFAULT GETDATE(),
  updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE CMLDLQ_ROLE_FEATURE_ACCESS (
  id INT IDENTITY(1,1) PRIMARY KEY,
  role_id INT NOT NULL,
  feature_id INT NOT NULL,
  FOREIGN KEY (feature_id) REFERENCES CMLDLQ_Features(id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT GETDATE(),
  updated_at DATETIME DEFAULT GETDATE()
);
INSERT INTO CMLDLQ_Features (name, description) VALUES
('filter_loan', 'Filter loan'),
('request_edit', 'Request edit loan'),
('loan_uploaded', 'Loan uploaded view'),
('update_loan', 'Update loan'),
('follow_up_loan', 'Follow up loan'),
('reset_password', 'Reset password for users'),
('disbursement', 'Loan disbursement'),
('recovery_management', 'Recovery management'),
('review_request_modify_village', 'Review village modification requests'),
('approve_modify_village', 'Approve village modification'),
('user_uploaded_filter_loan', 'Filter loans uploaded by user'),
('loan_form_kiva', 'Loan form for KIVA upload'),
('loan_posted_kiva', 'View loan posted in KIVA'),
('loan_status_kiva', 'View KIVA loan status'),
('repayment_schedule_kiva', 'Submit KIVA repayment'),
('view_all_users', 'View all users'),
('create_reset_user_password', 'Create or reset user password');
