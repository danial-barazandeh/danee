/*
  Warnings:

  - You are about to drop the column `SeoKeys` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "SeoKeys",
ADD COLUMN     "seoKeys" TEXT[];
