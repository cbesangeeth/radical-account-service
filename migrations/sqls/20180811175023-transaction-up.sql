CREATE TABLE "transaction" (
  "id" BIGSERIAL,
  "user_id" integer NOT NULL,
  "transaction_date" TIMESTAMPTZ NOT NULL ,
  "amount" NUMERIC NOT NULL,
  "cash_flow_type_id" integer NOT NULL,
  "transaction_type_id" integer NOT NULL,
  "created_at" TIMESTAMPTZ default current_timestamp,
  "updated_at" TIMESTAMPTZ default current_timestamp,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
  FOREIGN KEY ("cash_flow_type_id") REFERENCES "cash_flow_type" ("id"),
  FOREIGN KEY ("transaction_type_id") REFERENCES "transaction_type" ("id")
);

CREATE INDEX transaction_user_id_idx ON "transaction" (user_id);
CREATE INDEX transaction_cash_flow_type_id_idx ON "transaction" (cash_flow_type_id);
CREATE INDEX transaction_transaction_type_id_idx ON "transaction" (transaction_type_id);
CREATE INDEX transaction_transaction_date_idx ON "transaction" (transaction_date);
