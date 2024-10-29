/*
  Warnings:

  - Added the required column `number_of_recipients` to the `emails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emails" ADD COLUMN     "number_of_recipients" INTEGER NOT NULL,
ALTER COLUMN "number_of_views" SET DEFAULT 0;
