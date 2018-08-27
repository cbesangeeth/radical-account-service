CREATE TABLE "transaction" (
  "id" BIGSERIAL,
  "user_id" integer NOT NULL,
  "transaction_date" TIMESTAMPTZ NOT NULL ,
  "amount" NUMERIC NOT NULL,
  "cash_flow_type" varchar(10) NOT NULL,
  "account_type_id" integer NOT NULL,
  "created_at" TIMESTAMPTZ default current_timestamp,
  "updated_at" TIMESTAMPTZ default current_timestamp,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
  FOREIGN KEY ("account_type_id") REFERENCES "account_type" ("id")
);

CREATE INDEX transaction_user_id_idx ON "transaction" (user_id);
CREATE INDEX transaction_cash_flow_type_idx ON "transaction" (cash_flow_type);
CREATE INDEX transaction_account_type_id_idx ON "transaction" (account_type_id);
CREATE INDEX transaction_transaction_date_idx ON "transaction" (transaction_date);
