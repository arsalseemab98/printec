ALTER TABLE contracts
  ADD COLUMN payment_status text NOT NULL DEFAULT 'Not Paid'
    CHECK (payment_status IN ('Not Paid', 'Half Paid', 'Full Paid'));

ALTER TABLE contracts
  ADD COLUMN payment_email_sent_at timestamptz NULL;
