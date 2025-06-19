import { Buffer } from "node:buffer";
import { z } from "zod";

export enum EmailTemplateCategory {
    AUTH = "auth",
    NOTIFICATIONS = "notifications",
}

export enum EmailTemplateName {
    // Auth templates
    WELCOME = "welcome",

    // Notification templates
    ORDER_CONFIRMATION = "order-confirmation",
}

export enum EmailFormat {
    HTML = "html",
}

export const EmailRecipientSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
});

export type EmailRecipient = z.infer<typeof EmailRecipientSchema>;

export const EmailOptionsSchema = z.object({
    cc: z.array(EmailRecipientSchema).optional(),
    bcc: z.array(EmailRecipientSchema).optional(),
    replyTo: z.string().email().optional(),
    subject: z.string().optional(),
    attachments: z.array(
        z.object({
            filename: z.string(),
            content: z.union([z.string(), z.instanceof(Buffer)]),
            contentType: z.string().optional(),
        }),
    ).optional(),
    tags: z.array(
        z.object({
            name: z.string(),
            value: z.string(),
        }),
    ).optional(),
});

export type EmailOptions = z.infer<typeof EmailOptionsSchema>;

export type EmailSendResult = {
    success: boolean;
    id?: string;
    error?: Error;
};

export type EmailTemplateData = {
    [key: string]: string | number | boolean | undefined;
};

export type EmailTemplatePathOptions = {
    category: EmailTemplateCategory;
    name: EmailTemplateName;
    format: EmailFormat;
};
