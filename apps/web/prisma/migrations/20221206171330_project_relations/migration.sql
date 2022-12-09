-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "artificializedArea" DROP NOT NULL,
ALTER COLUMN "greenhouseGasEmissions" DROP NOT NULL,
ALTER COLUMN "waterConsumption" DROP NOT NULL,
ALTER COLUMN "selectiveSortingPercentage" DROP NOT NULL,
ALTER COLUMN "bikePathLength" DROP NOT NULL,
ALTER COLUMN "energyConsumption" DROP NOT NULL;
