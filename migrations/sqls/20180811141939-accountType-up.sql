CREATE TABLE "account_type" (
  "id" SERIAL,
  "name" VARCHAR(15) NOT NULL,
  "isCommon" BOOLEAN default false,
  "user_id" INTEGER,
  "description" VARCHAR(30),
  PRIMARY KEY ("id"),
  UNIQUE ("name")
);