/*
  Warnings:

  - You are about to drop the column `imageId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_imageId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "imageId";
