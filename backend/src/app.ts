import compression from "compression";
import cors from "cors";
import express from "express";

import env from "@/env";
import { errorHandler, notFound } from "@/middlewares";
import { setup } from "@/routes";

import { pinoLogger } from "./middlewares/pino-logger";

const app = express();

// middlewares
app.use(
    cors({
        origin: env.CORS_ORIGIN?.toString()
            .split(",")
            .map(x => x.trim()),
        credentials: true,
    }),
);
app.use(compression());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(pinoLogger());

app.get("/", (_req, res) => {
    res.json({
        message: "FundioVC Server is up and running 🚀",
    });
});

app.get("/health", (_req, res) => {
    res.json({
        message:
            env.NODE_ENV === "production"
                ? "Working fine"
                : "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    });
});

setup(app);

app.use(notFound);
app.use(errorHandler);

export default app;
