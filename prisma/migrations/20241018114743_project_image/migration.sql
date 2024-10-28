/*
  Warnings:

  - You are about to drop the column `project_banner` on the `Projetos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projetos" DROP COLUMN "project_banner",
ADD COLUMN     "project_image" TEXT;
