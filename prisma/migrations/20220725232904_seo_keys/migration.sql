/*
  Warnings:

  - The `SeoKeys` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `SeoKeys` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "SeoKeys",
ADD COLUMN     "SeoKeys" TEXT[];

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "SeoKeys",
ADD COLUMN     "SeoKeys" TEXT[];
