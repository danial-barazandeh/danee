/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "introUrl" TEXT;

-- DropTable
DROP TABLE "Video";
