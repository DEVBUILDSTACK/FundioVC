import type { NextFunction } from "express";

import type { CustomResponse, RequestBody } from "@/middlewares/type";
import type { LoginAdminRequest, RegisterAdminRequest, RegisterAdminResponse, SendOtpRequest } from "@/routes/user/type";

import { EmailFormat, emailService, EmailTemplateCategory, EmailTemplateName } from "@/services/email";

export async function registerAdminController(req: RequestBody<RegisterAdminRequest>, res: CustomResponse<RegisterAdminResponse>, next: NextFunction) {
    try {
        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Send OTP email
        const emailResult = await emailService.sendEmail(
            {
                category: EmailTemplateCategory.AUTH,
                name: EmailTemplateName.WELCOME,
                format: EmailFormat.HTML,
            },
            { email: req.body.email },
            {
                name: "User",
                company_name: "FundioVC",
                reset_url: `https://fundiovc.com/verify-otp?email=${encodeURIComponent(req.body.email)}&otp=${otp}`,
                expiry_time: 1,
            },
            {
                subject: "Your OTP Verification Code",
            },
        );

        if (!emailResult.success) {
            req.log.error(`Failed to send OTP email: ${emailResult.error?.message}`);
            return res.throwInternalServerError("Failed to send OTP email");
        }

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
        return res.success({
            message: "OTP sent successfully to your email",
        });
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
