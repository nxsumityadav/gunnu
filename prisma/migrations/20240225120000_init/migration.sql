-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('INTERVIEWING', 'RESEARCHING', 'DESIGNING', 'COMPLETE');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "rawIdea" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'INTERVIEWING',
    "interviewData" JSONB,
    "researchData" JSONB,
    "validationReport" JSONB,
    "designSystem" JSONB,
    "bundleMarkdown" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

