CREATE TABLE "cash_flow_type" (
  "id" serial,
  "name" varchar(15),
  "description" varchar(50),
  PRIMARY KEY ("id"),
  UNIQUE ("name")
);
