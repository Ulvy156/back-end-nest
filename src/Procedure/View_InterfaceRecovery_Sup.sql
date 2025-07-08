
/****** Object:  StoredProcedure [dbo].[View_InterfaceRecovery_Sup]    Script Date: 25-Jun-25 2:22:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[View_InterfaceRecovery_Sup] (
	@IBR_ID NVARCHAR(10), -- 0 is for all branches
	@STAFF_ID NVARCHAR(10), -- Must supply 
	@roleID INT, --LO or LRO or 0 for all
	@FROM_CONTACT_DT DATE,
	@TO_CONTACT_DT DATE,
	@Page int=1,
	@Size int=30
)

/*
	EXEC View_InterfaceRecovery_Sup '0','1746','0','2024-11-27','2025-06-09'
	SELECT * FROM USER_PROFILE_MST WHERE IBR_ID=769
*/

AS 
BEGIN
	DECLARE @S_ID NVARCHAR(10)
	--SET @roleID = (SELECT ROLE_ID FROM USER_PROFILE_MST WHERE IUSER_ID=@IBR_ID)
	IF @FROM_CONTACT_DT IS NULL
	BEGIN 
		SET @FROM_CONTACT_DT = '20220101'
	END
	IF @TO_CONTACT_DT IS NULL
	BEGIN
		SET @TO_CONTACT_DT = '20301231'
	END
	--SET @S_ID = @STAFF_ID
	IF @IBR_ID='0' 
	BEGIN
		SET @IBR_ID = '%'
	END
				
	--IF @roleID IN('0')
	--BEGIN
	--	SET @STAFF_ID= '1'
	--END

	--IF @roleID='0' OR @roleID =''
	--	BEGIN
	--		SET @roleID ='%'
	--	END
Declare @StartRow int, @EndRow int, @TolRow int
set @StartRow = ((@Page-1)*@Size)+1;
set @EndRow = @Page*@Size;

SELECT L.id, U.NAME,U.ROLE_ID,
		Product_type = (SELECT PL.REF_CODE FROM PICK_LIST_DTL PL WHERE PL.REC_TYP=1146 AND PL.KEY_CODE=I.LOAN_TYPE_S),
		I.SANC_AMT,I.SANC_DT,I.IBR_ID,
		isnull(sum(G.total_business_income + G.total_household_income),0) [Gross income],
		isnull(sum(G.total_business_income),0) [Total business income (6.a)],
		isnull(sum(G.total_household_income),0) [Total household income (6.b)],
		isnull(sum(E.total_business_expense + E.total_household_expense),0) [Gross expenses],
		isnull(sum(E.total_business_expense),0) [Total business expense (7.c)],
		isnull(sum(E.total_household_expense),0) [Total household expense (7.d)],
		isnull(sum(P.total_installment_amt + P.total_amt_private_lender),0) [Monthly payment debt],
		isnull(sum(P.total_installment_amt ),0) [Total installment amount to BFI (8.e)],
		isnull(sum(P.total_amt_private_lender),0) [Total installment amount to private lender (8.f)],
		isnull(sum(total_household_asset),0) [Total household asset],
		ACCSTATUS = CASE WHEN EXISTS(SELECT 1 FROM NPA_WRTOFF_ACTS_HISTORY W WHERE W.IACID=I.IACID AND W.DEL_FLG=0) THEN 'WRITE OFF' ELSE 'ACTIVE' END
INTO #E FROM CMLDLQ_loan_overdue L
	 LEFT OUTER JOIN CMLDLQ_gross_income G ON (L.id=G.loan_overdue_id)
	 LEFT OUTER JOIN CMLDLQ_gross_expenses E ON(L.id=E.loan_overdue_id)
	 LEFT OUTER JOIN CMLDLQ_monthly_payment P ON(L.id=P.loan_overdue_id)
	 LEFT OUTER JOIN CMLDLQ_household_assets A ON(L.id=A.loan_overdue_id)
	 LEFT OUTER JOIN USER_PROFILE_MST U ON U.IUSER_ID=L.iuser_id,
	 INST_ACT_MST I
WHERE L.acc_id=I.AC_ID AND I.DEL_FLAG=0 AND (I.AC_STA='A' OR EXISTS(SELECT 1 FROM NPA_WRTOFF_ACTS_HISTORY W WHERE W.IACID=I.IACID AND W.DEL_FLG=0)) --AND I.BOOK_BAL<>0
AND (CASE WHEN @roleID=0 THEN 0 ELSE U.ROLE_ID END)=@roleID AND L.contact_date BETWEEN @FROM_CONTACT_DT AND @TO_CONTACT_DT
AND I.IBR_ID IN(SELECT PERMISSION FROM PERM_DTL WHERE PERM_TYPE=1004 and IUSERID=@STAFF_ID) AND I.IBR_ID LIKE @IBR_ID
GROUP BY L.ID, U.NAME,I.LOAN_TYPE_S,I.SANC_AMT,I.SANC_DT,I.IBR_ID,U.ROLE_ID,I.IACID
--SELECT * FROM #E
--RETURN

;with GetLoanOverdueData as (
		SELECT
		ROW_NUMBER() over(order by L.ACC_ID) as SrNo,
		l.id,
		B.BR_CD,
		--(SELECT NAME FROM USER_PROFILE_MST U WHERE U.IUSER_ID = IAM.LOAN_OFFICER) STAFF_NAME,
		STAFF_NAME = E.NAME,
		L.cus_ID, L.acc_id, 
		c.SURNAME_KH +' '+ c.FIRSTNAME_KH as Customer_name_kh,
		c.SURNAME_ENG + ' ' + c.FIRSTNAME_ENG as Customer_name_Eng,
		CASE WHEN C.GENDER =1 THEN 'Male' when c.gender=2 then 'Female' else 'Company' end Gender,
		E.Product_type,
		isnull(E.SANC_AMT,0) as Dis_amt,
		Balance_Amt=isnull(L.Balance_Amt,0), 
		currency=isnull(L.currency,''), 
		Dsib_Date=isnull(CONVERT(NVARCHAR(20),E.SANC_DT,105),''), 
		Maturity_Date=isnull(CONVERT(NVARCHAR(20),L.Maturity_Date,105),''), 
		Last_Payment_Date=isnull(CONVERT(NVARCHAR(20),L.Last_Payment_Date,105),''), 
		Last_Payment_Amt=isnull(L.Last_Payment_Amt,0),
		Loan_Age=isnull(L.Loan_Age,0), 
		Par_Category=isnull(L.Par_Category,''),
		Total_Overdue_Amt=isnull(l.Total_Overdue_Amt,0), 
		Overdue_Principal=isnull(l.Overdue_Principal,0),
		Overdue_Interest=isnull(l.Overdue_Interest,0),
		Overdue_Monitoring_Fee=isnull(l.Overdue_Monitoring_Fee,0),
		Penalty=isnull(l.Penalty,0),
		Province = dbo.fnGetPickListDetails(7013,A.PROVINCE),
		District = dbo.fnGetPickListDetails(7014,A.DISTRICT),
		Commnue = dbo.fnGetPickListDetails(7015,A.COMMUNE),
		Village = dbo.fnGetPickListDetails(7016,A.VILLAGE),
		l.phone_number, contact_date=CONVERT(NVARCHAR(20),l.contact_date,105), l.contact_tool,l.staff_invole,
		l.met_who, income_existence=isnull(l.income_existence,''), 
		E.[Gross income],
		E.[Total business income (6.a)],
		E.[Total household income (6.b)],
		E.[Gross expenses],
		E.[Total business expense (7.c)],
		E.[Total household expense (7.d)],
		E.[Monthly payment debt],
		E.[Total installment amount to BFI (8.e)],
		E.[Total installment amount to private lender (8.f)],
		E.[Total household asset],
		net_income=isnull(l.net_income,0),current_repay_ratio=isnull(l.current_repay_ratio,0), 
		isnull(l.isPay_thisMonth,'') [Will you pay to CMP this month?],
		promise_date=isnull(CONVERT(NVARCHAR(20),l.promise_date,105),''),
		promise_amt=isnull(l.promise_amt,0), 
		estimate_willingness=isnull(l.estimate_willingness,''), 
		partner_type_default=isnull(l.partner_type_default,''),
		reason_overdue=isnull(l.reason_overdue,''),
		communication_step_taken=isnull(l.communication_step_taken,''), 
		support_from_guarantor=isnull(l.support_from_guarantor,''),
		loan_with_collateral=isnull(l.loan_with_collateral,''), 
		have_recheck=isnull(l.have_recheck,''), 
		reason_not_recheck=isnull(l.reason_not_recheck,''), 
		status_collateral=isnull(l.status_collateral,''),
		isnull(l.outstanding_loan,'') [Collateral Vs outstanding loan], l.remark_propose_solution, l.staff_recommend,
		E.ACCSTATUS
FROM CMLDLQ_loan_overdue L, CUST_MST C LEFT OUTER JOIN ADDR_MST A ON(A.KEY_FILD=C.ICUST_ID AND A.DEL_FLAG=0 AND A.REC_TYP='1001'),
#E E,BRANCH_MST B
WHERE C.CUST_ID = L.cus_ID AND E.id=L.id AND B.IBR_ID = E.IBR_ID)

--WHERE (CASE WHEN @roleID=0 THEN 0 ELSE E.ROLE_ID END)=@roleID AND L.contact_date BETWEEN @FROM_CONTACT_DT AND @TO_CONTACT_DT
--AND E.IBR_ID IN(SELECT PERMISSION FROM PERM_DTL WHERE PERM_TYPE=1004 and IUSERID=@STAFF_ID) AND E.IBR_ID LIKE @IBR_ID)
--AND ROW_NUMBER() over (order by l.id) between @StartRow and @EndRow)

--SELECT @TolRow=COUNT(*) FROM GetLoanOverdueData

select * from GetLoanOverdueData ORDER BY SrNo
END
