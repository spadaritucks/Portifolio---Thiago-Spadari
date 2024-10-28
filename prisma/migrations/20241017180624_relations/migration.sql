/*
  Warnings:

  - You are about to drop the column `technologies` on the `Projetos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projetos" DROP COLUMN "technologies";

-- CreateTable
CREATE TABLE "Projetos_Technologies" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER,
    "technologies" TEXT NOT NULL,

    CONSTRAINT "Projetos_Technologies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Projetos_Technologies" ADD CONSTRAINT "Projetos_Technologies_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projetos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
