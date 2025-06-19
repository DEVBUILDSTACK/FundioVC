import { defineConfig } from "drizzle-kit";

import { getDatabaseUrl } from "@/db";

export default defineConfig({
    schema: "./src/db/schema/index.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: getDatabaseUrl(),
    },
    verbose: true,
    strict: true,
});
