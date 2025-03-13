-- CreateTable
CREATE TABLE "UserDatabase" (
    "id" SERIAL NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "encryptedPassword" TEXT NOT NULL,
    "database" TEXT NOT NULL,

    CONSTRAINT "UserDatabase_pkey" PRIMARY KEY ("id")
);
