-- CreateTable
CREATE TABLE "Projetos" (
    "id" SERIAL NOT NULL,
    "technologies" TEXT[],
    "title" VARCHAR(50) NOT NULL,
    "company" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "git_link_1" TEXT NOT NULL,
    "git_link_2" TEXT,
    "project_link" TEXT,

    CONSTRAINT "Projetos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "password" VARCHAR(225) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
