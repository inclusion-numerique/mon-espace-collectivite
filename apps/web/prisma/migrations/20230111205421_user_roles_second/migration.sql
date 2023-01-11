/*
  Warnings:

  - The values [Municipality,Intercommunality,Prefecture,SubPrefecture] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;

UPDATE "User" SET "roles" = '{"User"}' WHERE "roles" != '{"Administrator"}';
UPDATE "PreRegistration" SET "role" = 'User' WHERE "role" != 'Administrator';

CREATE TYPE "UserRole_new" AS ENUM ('User', 'Administrator');
ALTER TABLE "User" ALTER COLUMN "roles" TYPE "UserRole_new"[] USING ("roles"::text::"UserRole_new"[]);
ALTER TABLE "PreRegistration" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;
