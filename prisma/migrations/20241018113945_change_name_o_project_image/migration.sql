/*
  Warnings:

  - You are about to drop the column `project_image` on the `Projetos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projetos" DROP COLUMN "project_image",
ADD COLUMN     "project_banner" TEXT;
