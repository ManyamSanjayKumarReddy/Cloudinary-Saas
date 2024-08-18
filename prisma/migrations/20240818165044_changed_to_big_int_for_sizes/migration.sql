/*
  Warnings:

  - Changed the type of `originalSize` on the `Video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `compressedSize` on the `Video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "originalSize",
ADD COLUMN     "originalSize" BIGINT NOT NULL,
DROP COLUMN "compressedSize",
ADD COLUMN     "compressedSize" BIGINT NOT NULL;
