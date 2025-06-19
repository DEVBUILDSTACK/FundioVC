import type { Application } from "express";

import { expressjwt } from "express-jwt";

import env from "@/env";
import userRouter from "@/routes/user";

export function setup(app: Application) {
    app.use(
        "/api/v1",
        expressjwt({
            algorithms: ["HS256"],
            secret: env.JWT_SECRET,
        }).unless({
            path: [
                "/",
                "/health",
                // /^\/api\/v1\/general\/settings\/get-one\/\*/,
            ],
        }),
    );

    app.use("/api/v1/user", userRouter);
}
