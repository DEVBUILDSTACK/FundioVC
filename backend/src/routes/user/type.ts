import * as z from "zod";

export const RegisterAdminRequest = z
    .object({
        name: z.string().nonempty(),
        email: z.string().email().transform(x => x.trim().toLowerCase()),
        password: z.string().min(8),
    })
    .strict();
export type RegisterAdminRequest = z.infer<typeof RegisterAdminRequest>;

export type RegisterAdminResponse = {
    id: string;
    email: string;
    name: string;
    accessToken: string;
};

export const LoginAdminRequest = z
    .object({
        email: z.string().email().transform(x => x.trim().toLowerCase()),
        password: z.string().min(8),
    })
    .strict();
export type LoginAdminRequest = z.infer<typeof LoginAdminRequest>;

export const SendOtpRequest = z
    .object({
        email: z.string().email().transform(x => x.trim().toLowerCase()),
    })
    .strict();
export type SendOtpRequest = z.infer<typeof SendOtpRequest>;
