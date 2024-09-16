-- CreateTable
CREATE TABLE "token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "uri" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ifpsData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "showName" BOOLEAN NOT NULL,
    "createdOn" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "website" TEXT NOT NULL
);
