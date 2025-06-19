import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { PgTransaction } from "drizzle-orm/pg-core";
import type { PostgresJsDatabase, PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";
import env from "@/env";

export type SchemaType = typeof schema;

export type TransactionType = PgTransaction<PostgresJsQueryResultHKT, SchemaType, ExtractTablesWithRelations<SchemaType>>;

export function getDatabaseUrl() {
    return env.DB_URL;
}

export const connection = postgres(getDatabaseUrl(), {
    ssl: false,
});

export type DBType = PostgresJsDatabase<typeof schema> & {
    $client: postgres.Sql;
};
export const db: DBType = drizzle(connection, {
    schema,
    logger: false,
});

export function getDB(tx?: TransactionType): DBType | TransactionType {
    return tx || db;
}

export type db = typeof db;
