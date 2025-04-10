-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "size" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "thumbnailUrl" TEXT;
