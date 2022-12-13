-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "intercommunalityCode" TEXT,
ADD COLUMN     "municipalityCode" TEXT;

-- CreateTable
CREATE TABLE "Municipality" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "intercommunalityCode" TEXT NOT NULL,
    "districtCode" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Intercommunality" (
    "code" TEXT NOT NULL,
    "crteCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Intercommunality_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Crte" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Crte_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "District" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countyCode" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "County" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "County_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Region" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_municipalityCode_fkey" FOREIGN KEY ("municipalityCode") REFERENCES "Municipality"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_intercommunalityCode_fkey" FOREIGN KEY ("intercommunalityCode") REFERENCES "Intercommunality"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_intercommunalityCode_fkey" FOREIGN KEY ("intercommunalityCode") REFERENCES "Intercommunality"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_districtCode_fkey" FOREIGN KEY ("districtCode") REFERENCES "District"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intercommunality" ADD CONSTRAINT "Intercommunality_crteCode_fkey" FOREIGN KEY ("crteCode") REFERENCES "Crte"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_countyCode_fkey" FOREIGN KEY ("countyCode") REFERENCES "County"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
