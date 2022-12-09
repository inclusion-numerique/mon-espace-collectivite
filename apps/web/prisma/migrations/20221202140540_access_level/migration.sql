/*
  Warnings:

  - Added the required column `level` to the `CommunityAccessLevel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('Owner', 'Write', 'Read');

-- AlterTable
ALTER TABLE "CommunityAccessLevel" ADD COLUMN     "level" "AccessLevel" NOT NULL;

-- AlterTable
ALTER TABLE "PreAuthorization" ADD COLUMN     "level" "AccessLevel";
