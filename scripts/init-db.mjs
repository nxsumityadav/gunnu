#!/usr/bin/env node
/**
 * Initialize Neon database schema.
 * Run: node --env-file=.env scripts/init-db.mjs
 * Or: DATABASE_URL=... node scripts/init-db.mjs
 */
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const sql = neon(url);

async function init() {
  try {
    await sql`
      CREATE TYPE "ProjectStatus" AS ENUM (
        'INTERVIEWING',
        'RESEARCHING',
        'DESIGNING',
        'COMPLETE'
      )
    `;
    console.log("Created ProjectStatus enum");
  } catch (e) {
    if (e?.message?.includes("already exists")) {
      console.log("ProjectStatus enum already exists");
    } else throw e;
  }

  try {
    await sql`
      CREATE TABLE "Project" (
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
      )
    `;
    console.log("Created Project table");
  } catch (e) {
    if (e?.message?.includes("already exists")) {
      console.log("Project table already exists");
    } else throw e;
  }

  console.log("Schema ready.");
}

init().catch((e) => {
  console.error(e);
  process.exit(1);
});
