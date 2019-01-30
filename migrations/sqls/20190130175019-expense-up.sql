CREATE TABLE "expense" (
  "id" BIGSERIAL,
  "user_id" integer NOT NULL,
  "transaction_date" TIMESTAMPTZ NOT NULL ,
  "amount" NUMERIC NOT NULL,
  "created_at" TIMESTAMPTZ default current_timestamp,
  "updated_at" TIMESTAMPTZ default current_timestamp,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);