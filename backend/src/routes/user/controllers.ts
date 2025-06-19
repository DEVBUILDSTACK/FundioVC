import type { NextFunction } from "express";

import type { CustomResponse, RequestBody } from "@/middlewares/type";
import type { LoginAdminRequest, RegisterAdminRequest, RegisterAdminResponse, SendOtpRequest } from "@/routes/user/type";

export async function registerAdminController(req: RequestBody<RegisterAdminRequest>, res: CustomResponse<RegisterAdminResponse>, next: NextFunction) {
    try {
        return res.success({
            id: "sample Id",
            email: "sample email",
            name: "sample name",
            accessToken: "sample token",
        }, "Admin added Successfully");
    } catch (error) {
        req.log.error(`error in registerAdminController: ${error}`);
        next(error);
    }
}

export async function loginAdminController(req: RequestBody<LoginAdminRequest>, res: CustomResponse<RegisterAdminResponse>, next: NextFunction) {
    try {
        return res.success({
            id: "sample Id",
            email: "sample email",
            name: "sample name",
            accessToken: "sample token",
        }, "Admin logged in Successfully");
    } catch (error) {
        req.log.error(`error in loginAdminController: ${error}`);
        next(error);
    }
}

export async function getAuthenticatedAdminController(req: ExpressRequest, res: CustomResponse<RegisterAdminResponse>, next: NextFunction) {
    try {
        return res.success({
            id: "sample Id",
            email: "sample email",
            name: "sample name",
            accessToken: "sample token",
        }, "Admin got Successfully");
    } catch (error) {
        req.log.error(`error in getAuthenticatedAdminController: ${error}`);
        next(error);
    }
}

export async function sendOtpController(req: RequestBody<SendOtpRequest>, res: CustomResponse<any>, next: NextFunction) {
    try {
        return res.success("OTP sent Successfully on your email");
    } catch (error) {
        req.log.error(`error in sendOtpController: ${error}`);
        next(error);
    }
}

export async function logoutAdminController(req: ExpressRequest, res: CustomResponse<any>, next: NextFunction) {
    try {
        return res.success("Admin logged out Successfully");
    } catch (error) {
        req.log.error(`error in logoutAdminController: ${error}`);
        next(error);
    }
}
