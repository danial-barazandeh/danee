/*
  Warnings:

  - Made the column `image` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "seoTitle" TEXT,
    "seoDiscription" TEXT,
    "SeoKeys" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "image" TEXT NOT NULL,
    "sale" BOOLEAN NOT NULL,
    "price" TEXT NOT NULL,
    "salePrice" TEXT,
    "free" BOOLEAN,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
