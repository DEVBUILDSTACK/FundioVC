import { sql } from "drizzle-orm";
import {
    index,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    accessToken: text("access_token"),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }).notNull().defaultNow().$onUpdateFn(() => sql`now()`),
}, table => [
    index("users_email_idx").on(table.email),
    index("users_access_token_idx").on(table.accessToken),
]);
export default users;

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
