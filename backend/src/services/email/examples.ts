// this file is just for email service examples. later we can remove this file

import { EmailFormat, emailService, EmailTemplateCategory, EmailTemplateName } from "./index";

/**
 * Example: Send a welcome email
 */
export async function sendWelcomeEmail(email: string, name: string, loginUrl: string) {
    const result = await emailService.sendEmail(
        {
            category: EmailTemplateCategory.AUTH,
            name: EmailTemplateName.WELCOME,
            format: EmailFormat.HTML,
        },
        { email, name },
        {
            name,
            company_name: "FundioVC",
            login_url: loginUrl,
        },
        {
            subject: "Welcome to FundioVC!",
        },
    );

    return result;
}

/**
 * Example: Send order confirmation email
 */
export async function sendOrderConfirmationEmail(
    email: string,
    name: string,
    orderNumber: string,
    orderDate: string,
    orderSummary: string,
    trackingUrl: string,
) {
    const result = await emailService.sendEmail(
        {
            category: EmailTemplateCategory.NOTIFICATIONS,
            name: EmailTemplateName.ORDER_CONFIRMATION,
            format: EmailFormat.HTML,
        },
        { email, name },
        {
            name,
            company_name: "FundioVC",
            order_number: orderNumber,
            order_date: orderDate,
            order_summary: orderSummary,
            order_tracking_url: trackingUrl,
        },
        {
            subject: `Order Confirmation #${orderNumber}`,
        },
    );

    return result;
}

async function main() {
    const result = await sendWelcomeEmail("moradiyayagnik7@gmail.com", "Yagnik Moradiya", "https://fundiovc.com/login");
    // eslint-disable-next-line no-console
    console.log(result);
}

main();
