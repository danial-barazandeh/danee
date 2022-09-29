-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
