-- Architect MVP schema for Neon PostgreSQL
-- Run with: psql $DATABASE_URL -f scripts/init-schema.sql

CREATE TYPE "ProjectStatus" AS ENUM (
  'INTERVIEWING',
  'RESEARCHING',
  'DESIGNING',
  'COMPLETE'
);

CREATE TABLE IF NOT EXISTS "Project" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "rawIdea" TEXT NOT NULL,
  "status" "ProjectStatus" NOT NULL DEFAULT 'INTERVIEWING',
  "interviewData" JSONB,
  "researchData" JSONB,
  "validationReport" JSONB,
  "designSystem" JSONB,
  "bundleMarkdown" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
