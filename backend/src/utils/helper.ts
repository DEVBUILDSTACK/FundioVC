import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import env from "@/env";

export function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
}

export function decodeToken(token: string): any {
    return jwt.decode(token?.replace("Bearer ", ""));
}

export function getJWTToken(data: object) {
    const token = `Bearer ${jwt.sign(data, env.JWT_SECRET, {
        expiresIn: "10h",
    })}`;
    return token;
}

export class ExpiringMap<K, V> {
    private map = new Map<K, V>();

    set(key: K, value: V, ttl: number = 120000) { // ttl in milliseconds, default to 2 minutes
        this.map.set(key, value);
        setTimeout(() => this.map.delete(key), ttl); // remove after `ttl` milliseconds
    }

    get(key: K): V | undefined {
        return this.map.get(key);
    }

    has(key: K): boolean {
        return this.map.has(key);
    }

    delete(key: K): boolean {
        return this.map.delete(key);
    }
}
export const hashMapWithExpiry = new ExpiringMap<string, number>();
