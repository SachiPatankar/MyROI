CREATE TABLE emi_records (
  id SERIAL PRIMARY KEY,
  loan_amount DECIMAL(15, 2),
  interest_rate DECIMAL(5, 2),
  loan_tenure_months INTEGER,
  emi DECIMAL(15, 2),
  prepayment_amount DECIMAL(15, 2) DEFAULT 0,
  remaining_balance DECIMAL(15, 2)
);


CREATE TABLE monthly_payments (
  id SERIAL PRIMARY KEY,
  emi_record_id INTEGER REFERENCES emi_records(id),
  month INTEGER,
  emi_paid DECIMAL(15, 2),
  interest_paid DECIMAL(15, 2),
  principal_paid DECIMAL(15, 2),
  prepayment DECIMAL(15, 2),
  remaining_balance DECIMAL(15, 2)
);
