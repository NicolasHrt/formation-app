/*
  Warnings:

  - You are about to drop the column `status` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "status";

-- CreateIndex
CREATE INDEX "Module_courseId_idx" ON "Module"("courseId");

-- CreateIndex
CREATE INDEX "Module_order_idx" ON "Module"("order");

-- CreateIndex
CREATE INDEX "Video_moduleId_idx" ON "Video"("moduleId");

-- CreateIndex
CREATE INDEX "Video_order_idx" ON "Video"("order");
