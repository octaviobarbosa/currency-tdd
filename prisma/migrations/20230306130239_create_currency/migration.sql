-- CreateTable
CREATE TABLE "currency" (
    "currency" VARCHAR(3) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("currency")
);
