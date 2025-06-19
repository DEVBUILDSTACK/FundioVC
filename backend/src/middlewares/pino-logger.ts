import { join } from "node:path";
import pino from "pino";
import pinoHttp from "pino-http";

import env from "@/env";

// Define log directory and filename
const logPath = join(process.cwd(), "logs", "app.log");

// Configure logger based on environment
export const logger = pino({
    level: env.LOG_LEVEL || "info",
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: env.NODE_ENV === "production"
        ? {
                target: "pino-roll",
                options: {
                    file: logPath,
                    frequency: "daily",
                    mkdir: true,
                    maxSize: "10m",
                    maxFiles: 10,
                    compress: true,
                },
            }
        : {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "SYS:standard",
                    ignore: "pid,hostname",
                },
            },
});

export function pinoLogger() {
    return pinoHttp({ logger });
}
