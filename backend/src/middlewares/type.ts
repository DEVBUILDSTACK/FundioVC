import type { Request, Response } from "express";
import type { AnyZodObject, ZodEffects, ZodTypeAny } from "zod";

declare global {
    // eslint-disable-next-line
    interface ExpressRequest<P = any, RB = any, B = any, Q = any> extends Request<P, RB, B, Q> {
        // auth?: JwtPayload & { role: UserRole };
        // user: {
        //     admin?: any;
        // };
    }
}

export type RequestBody<T> = ExpressRequest<object, T, T, object>;
export type RequestQuery<T> = ExpressRequest<object, object, object, T>;
export type RequestParams<T> = ExpressRequest<T, object, object, object>;

export type BadRequestErrorType = {
    message: string;
    errorType: string;
};

// eslint-disable-next-line
export interface CustomResponse<T = any> extends Response {
    throwBadRequestError: (message: string, errorObj?: object) => Response;
    throwInternalServerError: (message: any) => Response;
    unauthorized: (message: any) => Response;
    forbidden: (message: any) => Response;

    success: (data: T | undefined, message?: string) => Response;
}

type RequestValidators = {
    params?: AnyZodObject | ZodEffects<ZodTypeAny>;
    body?: AnyZodObject | ZodEffects<ZodTypeAny>;
    query?: AnyZodObject | ZodEffects<ZodTypeAny>;
};
export default RequestValidators;
