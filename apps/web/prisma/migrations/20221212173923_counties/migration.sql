/*
  Warnings:

  - Added the required column `regionCode` to the `County` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "County" ADD COLUMN     "regionCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "County" ADD CONSTRAINT "County_regionCode_fkey" FOREIGN KEY ("regionCode") REFERENCES "Region"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
