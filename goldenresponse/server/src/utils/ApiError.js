/**
 * Custom API Error class for structured error handling across the application.
 * Extends the native Error class with HTTP status codes and an errors array
 * for field-level validation feedback.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Human-readable error message
   * @param {Array} errors - Optional array of field-level error details
   */
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'ApiError';

    // Capture stack trace, excluding the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }

  /** 400 Bad Request — invalid input or validation failure */
  static badRequest(message = 'Bad request', errors = []) {
    return new ApiError(400, message, errors);
  }

  /** 401 Unauthorized — missing or invalid authentication */
  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  /** 403 Forbidden — authenticated but insufficient permissions */
  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  /** 404 Not Found — requested resource does not exist */
  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  /** 500 Internal Server Error — unexpected server-side failure */
  static internal(message = 'Internal server error') {
    return new ApiError(500, message);
  }
}

export default ApiError;
