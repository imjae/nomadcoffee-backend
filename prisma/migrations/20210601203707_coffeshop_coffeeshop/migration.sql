/*
  Warnings:

  - You are about to drop the `CoffeShopPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToCoffeShop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoffeShop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoffeShopPhoto" DROP CONSTRAINT "CoffeShopPhoto_coffeShopId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCoffeShop" DROP CONSTRAINT "_CategoryToCoffeShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCoffeShop" DROP CONSTRAINT "_CategoryToCoffeShop_B_fkey";

-- DropForeignKey
ALTER TABLE "CoffeShop" DROP CONSTRAINT "CoffeShop_userId_fkey";

-- DropTable
DROP TABLE "CoffeShopPhoto";

-- DropTable
DROP TABLE "_CategoryToCoffeShop";

-- DropTable
DROP TABLE "CoffeShop";

-- CreateTable
CREATE TABLE "CoffeeShopPhoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "coffeeShopId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoffeeShop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToCoffeeShop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCoffeeShop_AB_unique" ON "_CategoryToCoffeeShop"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToCoffeeShop_B_index" ON "_CategoryToCoffeeShop"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeeShop" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeeShop" ADD FOREIGN KEY ("B") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoffeeShop" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
