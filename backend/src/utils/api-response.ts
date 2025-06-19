/**
 * Class representing an API Response.
 */
export default class ApiResponse<T = any> {
    private readonly data?: T;
    private readonly message: string;
    private readonly error?: unknown;
    private readonly success: boolean;
    private readonly statusCode: number;

    /**
     * Create an API response object
     * @param data - The response data
     * @param message - Response message
     * @param error - Error details if any
     * @param statusCode - HTTP status code
     */
    constructor(
        data?: T,
        message = "",
        error?: unknown,
        statusCode = 200,
    ) {
        this.message = message;
        this.statusCode = statusCode;
        this.success = !error && statusCode >= 200 && statusCode < 400;

        if (data !== undefined && data !== null) {
            this.data = data;
        }

        if (error) {
            this.error = error;
        }
    }

    /**
     * Convert the response to a standard format
     */
    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            error: this.error,
        };
    }

    /**
     * Create a success response
     * @param data - The response data
     * @param message - Success message
     * @param statusCode - HTTP status code (default: 200)
     */
    static success<T>(data?: T, message = "Success", statusCode = 200) {
        return new ApiResponse<T>(data, message, undefined, statusCode);
    }

    /**
     * Create an error response
     * @param error - Error details
     * @param message - Error message
     * @param statusCode - HTTP status code (default: 400)
     */
    static error(error: unknown, message = "Error occurred", statusCode = 400) {
        return new ApiResponse(null, message, error, statusCode);
    }
}
