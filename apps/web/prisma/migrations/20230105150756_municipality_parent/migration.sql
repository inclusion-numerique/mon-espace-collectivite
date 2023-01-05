/*
  Warnings:

  - You are about to drop the column `siren` on the `Municipality` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Municipality" DROP COLUMN "siren",
ADD COLUMN     "parentCode" TEXT;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_parentCode_fkey" FOREIGN KEY ("parentCode") REFERENCES "Municipality"("code") ON DELETE SET NULL ON UPDATE CASCADE;
