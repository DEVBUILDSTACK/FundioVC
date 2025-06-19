import fs from "node:fs";
import path from "node:path";

import type { EmailTemplateData, EmailTemplatePathOptions } from "@/services/email/types";

import { EmailFormat } from "@/services/email/types";

const TEMPLATE_BASE_PATH = path.join(__dirname, "templates");

export function getTemplatePath(options: EmailTemplatePathOptions): string {
    const { category, name, format } = options;
    return path.join(TEMPLATE_BASE_PATH, category, `${name}.${format}`);
}

export function getBaseTemplatePath(format: EmailFormat): string {
    return path.join(TEMPLATE_BASE_PATH, "base", `layout.${format}`);
}

export function readTemplate(filePath: string): string {
    try {
        return fs.readFileSync(filePath, "utf-8");
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        throw new Error(`Failed to read template file ${filePath}: ${errorMessage}`);
    }
}

export function processTemplate(template: string, data: EmailTemplateData): string {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const trimmedKey = key.trim();
        return data[trimmedKey] !== undefined ? String(data[trimmedKey]) : match;
    });
}

export function processEmailTemplate(
    options: EmailTemplatePathOptions,
    data: EmailTemplateData,
): string {
    const contentTemplatePath = getTemplatePath(options);
    const contentTemplate = readTemplate(contentTemplatePath);

    const processedContent = processTemplate(contentTemplate, data);

    // For HTML format, embed in base template
    if (options.format === EmailFormat.HTML) {
        // Get and read the base template
        const baseTemplatePath = getBaseTemplatePath(options.format);
        const baseTemplate = readTemplate(baseTemplatePath);

        // Add the processed content to the data for the base template
        const baseData = {
            ...data,
            content: processedContent,
            current_year: new Date().getFullYear(),
            company_name: data.company_name || "FundioVC",
            footer_text: data.footer_text || "If you have any questions, please contact our support team.",
        };

        // Process the base template with the combined data
        return processTemplate(baseTemplate, baseData);
    }

    return processedContent;
}
