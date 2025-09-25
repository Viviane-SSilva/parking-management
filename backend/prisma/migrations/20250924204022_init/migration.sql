-- CreateTable
CREATE TABLE "public"."ParkingSpot" (
    "id" TEXT NOT NULL,
    "spotNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VehicleInfo" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "entryTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "spotId" TEXT NOT NULL,

    CONSTRAINT "VehicleInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParkingSpot_spotNumber_key" ON "public"."ParkingSpot"("spotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleInfo_plate_key" ON "public"."VehicleInfo"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleInfo_spotId_key" ON "public"."VehicleInfo"("spotId");

-- AddForeignKey
ALTER TABLE "public"."VehicleInfo" ADD CONSTRAINT "VehicleInfo_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "public"."ParkingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
