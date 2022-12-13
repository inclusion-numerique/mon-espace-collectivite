-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Public', 'Municipality', 'Intercommunality', 'Prefecture', 'SubPrefecture', 'Administrator');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'Pending', 'Suspended', 'Rejected');

-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('Owner', 'Write', 'Read');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "onboarded" TIMESTAMP(3),
    "image" TEXT,
    "location" TEXT,
    "title" TEXT,
    "description" TEXT,
    "roles" "UserRole"[],
    "status" "UserStatus" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MunicipalityAccessLevel" (
    "userId" UUID NOT NULL,
    "level" "AccessLevel" NOT NULL,
    "municipalityCode" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MunicipalityAccessLevel_pkey" PRIMARY KEY ("userId","municipalityCode")
);

-- CreateTable
CREATE TABLE "IntercommunalityAccessLevel" (
    "userId" UUID NOT NULL,
    "level" "AccessLevel" NOT NULL,
    "intercommunalityCode" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntercommunalityAccessLevel_pkey" PRIMARY KEY ("userId","intercommunalityCode")
);

-- CreateTable
CREATE TABLE "DistrictAccessLevel" (
    "userId" UUID NOT NULL,
    "level" "AccessLevel" NOT NULL,
    "districtCode" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DistrictAccessLevel_pkey" PRIMARY KEY ("userId","districtCode")
);

-- CreateTable
CREATE TABLE "CountyAccessLevel" (
    "userId" UUID NOT NULL,
    "level" "AccessLevel" NOT NULL,
    "countyCode" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CountyAccessLevel_pkey" PRIMARY KEY ("userId","countyCode")
);

-- CreateTable
CREATE TABLE "PreRegistration" (
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "municipalityCode" TEXT,
    "countyCode" TEXT,
    "districtCode" TEXT,
    "intercommunalityCode" TEXT,
    "level" "AccessLevel",
    "allowSignup" BOOLEAN NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "name" TEXT,
    "image" TEXT,
    "location" TEXT,
    "title" TEXT,
    "description" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreRegistration_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "token" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "reference" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "start" DATE,
    "end" DATE,
    "progress" TEXT,
    "description" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" UUID,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "municipalityCode" TEXT,
    "intercommunalityCode" TEXT,
    "artificializedArea" INTEGER,
    "greenhouseGasEmissions" INTEGER,
    "waterConsumption" INTEGER,
    "selectiveSortingPercentage" INTEGER,
    "bikePathLength" INTEGER,
    "energyConsumption" INTEGER,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectNote" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "createdById" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "code" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
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
    "countyCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "County" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,

    CONSTRAINT "County_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "ProjectTheme" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProjectTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" UUID NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "_ProjectsSecondaryCategories" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Project_reference_key" ON "Project"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTheme_slug_key" ON "ProjectTheme"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCategory_slug_key" ON "ProjectCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectsSecondaryCategories_AB_unique" ON "_ProjectsSecondaryCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectsSecondaryCategories_B_index" ON "_ProjectsSecondaryCategories"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MunicipalityAccessLevel" ADD CONSTRAINT "MunicipalityAccessLevel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MunicipalityAccessLevel" ADD CONSTRAINT "MunicipalityAccessLevel_municipalityCode_fkey" FOREIGN KEY ("municipalityCode") REFERENCES "Municipality"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntercommunalityAccessLevel" ADD CONSTRAINT "IntercommunalityAccessLevel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntercommunalityAccessLevel" ADD CONSTRAINT "IntercommunalityAccessLevel_intercommunalityCode_fkey" FOREIGN KEY ("intercommunalityCode") REFERENCES "Intercommunality"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistrictAccessLevel" ADD CONSTRAINT "DistrictAccessLevel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistrictAccessLevel" ADD CONSTRAINT "DistrictAccessLevel_districtCode_fkey" FOREIGN KEY ("districtCode") REFERENCES "District"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountyAccessLevel" ADD CONSTRAINT "CountyAccessLevel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountyAccessLevel" ADD CONSTRAINT "CountyAccessLevel_countyCode_fkey" FOREIGN KEY ("countyCode") REFERENCES "County"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreRegistration" ADD CONSTRAINT "PreRegistration_municipalityCode_fkey" FOREIGN KEY ("municipalityCode") REFERENCES "Municipality"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreRegistration" ADD CONSTRAINT "PreRegistration_countyCode_fkey" FOREIGN KEY ("countyCode") REFERENCES "County"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreRegistration" ADD CONSTRAINT "PreRegistration_districtCode_fkey" FOREIGN KEY ("districtCode") REFERENCES "District"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreRegistration" ADD CONSTRAINT "PreRegistration_intercommunalityCode_fkey" FOREIGN KEY ("intercommunalityCode") REFERENCES "Intercommunality"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProjectCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_municipalityCode_fkey" FOREIGN KEY ("municipalityCode") REFERENCES "Municipality"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_intercommunalityCode_fkey" FOREIGN KEY ("intercommunalityCode") REFERENCES "Intercommunality"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectNote" ADD CONSTRAINT "ProjectNote_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectNote" ADD CONSTRAINT "ProjectNote_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_intercommunalityCode_fkey" FOREIGN KEY ("intercommunalityCode") REFERENCES "Intercommunality"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_districtCode_fkey" FOREIGN KEY ("districtCode") REFERENCES "District"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intercommunality" ADD CONSTRAINT "Intercommunality_crteCode_fkey" FOREIGN KEY ("crteCode") REFERENCES "Crte"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_countyCode_fkey" FOREIGN KEY ("countyCode") REFERENCES "County"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "County" ADD CONSTRAINT "County_regionCode_fkey" FOREIGN KEY ("regionCode") REFERENCES "Region"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCategory" ADD CONSTRAINT "ProjectCategory_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "ProjectTheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsSecondaryCategories" ADD CONSTRAINT "_ProjectsSecondaryCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsSecondaryCategories" ADD CONSTRAINT "_ProjectsSecondaryCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "ProjectCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
