/* eslint-disable no-console */
import { Resend } from "resend";

import type {
    EmailOptions,
    EmailRecipient,
    EmailSendResult,
    EmailTemplateData,
    EmailTemplatePathOptions,
} from "@/services/email/types";

import { NodeEnv } from "@/constant";
import env from "@/env";
import { processEmailTemplate } from "@/services/email/template-processor";
import { EmailFormat, EmailRecipientSchema } from "@/services/email/types";

class EmailService {
    private resend: Resend | null = null;
    private readonly defaultFrom: string;
    private readonly defaultFromName: string;
    private readonly isDevelopment: boolean;

    constructor() {
        this.defaultFrom = env.EMAIL_FROM;
        this.defaultFromName = env.EMAIL_FROM_NAME;
        this.isDevelopment = env.NODE_ENV !== NodeEnv.production;

        // Initialize Resend if API key is available
        if (env.RESEND_API_KEY) {
            this.resend = new Resend(env.RESEND_API_KEY);
        } else if (!this.isDevelopment) {
            // Only warn in production environment
            console.warn("Resend API key not provided. Email service will not send actual emails.");
        }
    }

    validateEmail(email: string): boolean {
        const result = EmailRecipientSchema.shape.email.safeParse(email);
        return result.success;
    }

    private formatRecipient(recipient: EmailRecipient): string {
        if (recipient.name) {
            return `${recipient.name} <${recipient.email}>`;
        }
        return recipient.email;
    }

    async sendEmail(
        templateOptions: EmailTemplatePathOptions,
        to: EmailRecipient,
        data: EmailTemplateData,
        options: EmailOptions = {},
    ): Promise<EmailSendResult> {
        try {
            // Validate recipient email
            if (!this.validateEmail(to.email)) {
                throw new Error(`Invalid recipient email: ${to.email}`);
            }

            // Process HTML and text templates
            const htmlContent = processEmailTemplate(
                { ...templateOptions, format: EmailFormat.HTML },
                data,
            );

            // In development mode, log email instead of sending
            if (this.isDevelopment) {
                // Use console.error for development logging to match project standards
                console.log("[DEV MODE] Email would be sent in production:");
                console.log(`[DEV MODE] To: ${this.formatRecipient(to)}`);
                console.log(`[DEV MODE] Subject: ${options.subject || "No subject"}`);
                console.log(`[DEV MODE] HTML Content length: ${htmlContent.length} chars`);

                return {
                    success: true,
                    id: "dev-mode-email-id",
                };
            }

            // Check if Resend is initialized
            if (!this.resend) {
                throw new Error("Resend API client not initialized. Check your API key.");
            }

            // Send email using Resend
            const result = await this.resend.emails.send({
                from: `${this.defaultFromName} <${this.defaultFrom}>`,
                // to: [this.formatRecipient(to)],
                to: [to.email],
                subject: options.subject || `Message from ${this.defaultFromName}`,
                html: htmlContent,
                cc: options.cc?.map(cc => this.formatRecipient(cc)),
                bcc: options.bcc?.map(bcc => this.formatRecipient(bcc)),
                replyTo: options.replyTo,
                attachments: options.attachments,
                tags: options.tags,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            return {
                success: true,
                id: result.data?.id,
            };
        } catch (error) {
            console.error("Failed to send email:", error);
            return {
                success: false,
                error: error instanceof Error ? error : new Error(String(error)),
            };
        }
    }

    async sendBulkEmail(
        templateOptions: EmailTemplatePathOptions,
        recipients: EmailRecipient[],
        data: EmailTemplateData,
        options: EmailOptions = {},
    ): Promise<EmailSendResult[]> {
        const results: EmailSendResult[] = [];

        // Send emails to each recipient
        for (const recipient of recipients) {
            const result = await this.sendEmail(
                templateOptions,
                recipient,
                {
                    ...data,
                    name: recipient.name || "",
                },
                options,
            );

            results.push(result);
        }

        return results;
    }
}

// Export a singleton instance
export const emailService = new EmailService();

// Export the class for testing purposes
export default EmailService;
