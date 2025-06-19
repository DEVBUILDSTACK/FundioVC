import type { NextFunction, Request, Response, Router } from "express";

import express from "express";
import S from "http-status";

import type { CustomResponse } from "@/middlewares/type";

import ApiResponse from "@/utils/api-response";

export class CustomRouter {
    router: Router;

    constructor() {
        this.router = express.Router();
    }

    private extendResponse(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction): void => {
            const customRes = res as CustomResponse;
            // Add success response method
            customRes.success = function (data?: any, message?: string) {
                return this.status(S.OK).json(ApiResponse.success(data, message));
            };

            customRes.throwBadRequestError = function (message: string, errorObj?: any) {
                return this.status(S.BAD_REQUEST).json(ApiResponse.error(errorObj, message, S.BAD_REQUEST));
            };

            customRes.unauthorized = function (errMsg: string) {
                return this.status(S.UNAUTHORIZED).json(ApiResponse.error(errMsg, errMsg, S.UNAUTHORIZED));
            };

            customRes.forbidden = function (errMsg: string) {
                return this.status(S.FORBIDDEN).json(ApiResponse.error(errMsg, errMsg, S.FORBIDDEN));
            };

            customRes.throwInternalServerError = function (errObj: any) {
                req.log.error(errObj);
                return this.status(S.INTERNAL_SERVER_ERROR).json(ApiResponse.error(errObj, "Internal Server Error", S.INTERNAL_SERVER_ERROR));
            };

            next();
        };
    }

    public get = async (path: string, ...handler: any) => {
        this.router.get(
            path,
            this.extendResponse(),
            handler,
        );
    };

    post = async (path: string, ...handler: any) => {
        this.router.post(
            path,
            this.extendResponse(),
            handler,
        );
    };

    put = async (path: string, ...handler: any) => {
        this.router.put(
            path,
            this.extendResponse(),
            handler,
        );
    };

    patch = async (path: string, ...handler: any) => {
        this.router.patch(
            path,
            this.extendResponse(),
            handler,
        );
    };

    delete = async (path: string, ...handler: any) => {
        this.router.delete(
            path,
            this.extendResponse(),
            handler,
        );
    };
}
