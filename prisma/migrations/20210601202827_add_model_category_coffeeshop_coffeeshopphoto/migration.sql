-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "totalShops" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoffeShopPhoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "coffeShopId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoffeShop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToCoffeShop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCoffeShop_AB_unique" ON "_CategoryToCoffeShop"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToCoffeShop_B_index" ON "_CategoryToCoffeShop"("B");

-- AddForeignKey
ALTER TABLE "CoffeShop" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeShop" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeShop" ADD FOREIGN KEY ("B") REFERENCES "CoffeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoffeShopPhoto" ADD FOREIGN KEY ("coffeShopId") REFERENCES "CoffeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
