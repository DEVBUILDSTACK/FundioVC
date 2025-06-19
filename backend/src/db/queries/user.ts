import type { SQL } from "drizzle-orm";

import { and, eq } from "drizzle-orm";

import type { TransactionType } from "@/db/index";
import type { InsertUser } from "@/db/schema/users";

import { getDB } from "@/db/index";
import users from "@/db/schema/users";

export async function create(data: InsertUser, tx?: TransactionType) {
    const db = getDB(tx);

    const [user] = await db.insert(users).values(data).returning();

    return user ?? null;
}

export async function findOne_And(data: { id?: string; email?: string; accessToken?: string }, tx?: TransactionType) {
    const db = getDB(tx);
    const conditions: SQL[] = [];

    if (data.id) {
        conditions.push(eq(users.id, data.id));
    }
    if (data.email) {
        conditions.push(eq(users.email, data.email));
    }
    if (data.accessToken) {
        conditions.push(eq(users.accessToken, data.accessToken));
    }

    if (conditions.length === 0) {
        return null;
    }

    const user = await db.select().from(users).where(and(...conditions)).limit(1);
    return user[0] ?? null;
}

export async function update(data: Partial<InsertUser> & { id: string }, tx?: TransactionType) {
    const db = getDB(tx);

    const [user] = await db.update(users).set(data).where(eq(users.id, data.id)).returning();

    return user ?? null;
}
