/*
  Warnings:

  - You are about to drop the column `SeoKeys` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "SeoKeys",
ADD COLUMN     "seoKeys" TEXT[];
