/*
  Warnings:

  - A unique constraint covering the columns `[siren]` on the table `Municipality` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `siren` to the `Municipality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "siren" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_siren_key" ON "Municipality"("siren");
