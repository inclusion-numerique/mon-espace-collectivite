-- AlterTable
ALTER TABLE "ProjectNote" ADD COLUMN     "countyCode" TEXT,
ADD COLUMN     "districtCode" TEXT,
ADD COLUMN     "intercommunalityCode" TEXT,
ADD COLUMN     "municipalityCode" TEXT;

-- AddForeignKey
ALTER TABLE "ProjectNote" ADD CONSTRAINT "ProjectNote_municipalityCode_fkey" FOREIGN KEY ("municipalityCode") REFERENCES "Municipality"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectNote" ADD CONSTRAINT "ProjectNote_intercommunalityCode_fkey" FOREIGN KEY ("intercommunalityCode") REFERENCES "Intercommunality"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectNote" ADD CONSTRAINT "ProjectNote_districtCode_fkey" FOREIGN KEY ("districtCode") REFERENCES "District"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectNote" ADD CONSTRAINT "ProjectNote_countyCode_fkey" FOREIGN KEY ("countyCode") REFERENCES "County"("code") ON DELETE SET NULL ON UPDATE CASCADE;
