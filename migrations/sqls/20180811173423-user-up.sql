CREATE TABLE "user" (
  "id" serial,
  "first_name" varchar(15) NOT NULL,
  "last_name" varchar(15),
  "mail" varchar(50) NOT NULL,
  "phone" varchar(12) NOT NULL,
  "password" varchar(15) NOT NULL,
  "current_balance" NUMERIC default 0.00,
  "is_active" boolean default true,
  "login_count" integer,
  "login_at" TIMESTAMPTZ default current_timestamp,
  "created_at" TIMESTAMPTZ default current_timestamp,
  "updated_at" TIMESTAMPTZ default current_timestamp,
  PRIMARY KEY ("id"),
  UNIQUE ("mail" , "phone")
);
