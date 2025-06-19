import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import type { AnyZodObject, ZodEffects, ZodTypeAny } from "zod";

import S from "http-status";
import { ZodError } from "zod";

import { NodeEnv } from "@/constant";
import env from "@/env";
import ApiResponse from "@/utils/api-response";

type RequestValidators = {
    params?: AnyZodObject | ZodEffects<ZodTypeAny>;
    body?: AnyZodObject | ZodEffects<ZodTypeAny>;
    query?: AnyZodObject | ZodEffects<ZodTypeAny>;
};

export function validateRequest(validators: RequestValidators) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (validators.params) {
                req.params = await validators.params.parseAsync(req.params);
            }
            if (validators.body) {
                req.body = await validators.body.parseAsync(req.body);
            }
            if (validators.query) {
                req.query = await validators.query.parseAsync(req.query);
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(S.UNPROCESSABLE_ENTITY);
            }
            next(error);
        }
    };
}

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(S.NOT_FOUND);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    try {
        const errStack = env.NODE_ENV !== NodeEnv.production ? err.stack : "💩";

        if (err.name === "UnauthorizedError") {
            res.status(S.UNAUTHORIZED).json(new ApiResponse(null, err.message, errStack));
            return;
        }
        const statusCode = res.statusCode !== S.OK ? res.statusCode : S.INTERNAL_SERVER_ERROR;

        if (err instanceof ZodError) {
            res.status(statusCode).json(
                new ApiResponse(
                    null,
                    "Zod Error",
                    err,
                ),
            );
            return;
        }

        res.status(statusCode).json(new ApiResponse(null, err.message, errStack));
    } catch (error) {
        req.log.error("error in errorHandler", error);
        res.status(500).json(
            new ApiResponse(null, "Exception: Internal server error", ""),
        );
    }
};
