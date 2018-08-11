CREATE TABLE "transaction_type" (
  "id" serial,
  "name" varchar(15) NOT NULL,
  "description" varchar(30),
  PRIMARY KEY ("id"),
  UNIQUE ("name")
);