/**
 * Standardized API response helper.
 * Ensures every response from the server follows a consistent JSON structure,
 * making it predictable for frontend consumers.
 */
class ApiResponse {
  /**
   * Send a success response.
   * @param {object} res - Express response object
   * @param {number} statusCode - HTTP status code (e.g. 200)
   * @param {string} message - Success message
   * @param {*} data - Response payload
   */
  static success(res, statusCode = 200, message = 'Success', data = null) {
    const response = { success: true, message };
    if (data !== null) response.data = data;
    return res.status(statusCode).json(response);
  }

  /**
   * Send a 201 Created response — convenience wrapper for resource creation.
   * @param {object} res - Express response object
   * @param {string} message - Success message
   * @param {*} data - The newly created resource
   */
  static created(res, message = 'Created successfully', data = null) {
    return ApiResponse.success(res, 201, message, data);
  }

  /**
   * Send an error response.
   * @param {object} res - Express response object
   * @param {number} statusCode - HTTP status code (e.g. 400, 500)
   * @param {string} message - Error message
   * @param {Array} errors - Optional array of field-level error details
   */
  static error(res, statusCode = 500, message = 'Error', errors = []) {
    const response = { success: false, message };
    if (errors.length > 0) response.errors = errors;
    return res.status(statusCode).json(response);
  }
}

export default ApiResponse;
