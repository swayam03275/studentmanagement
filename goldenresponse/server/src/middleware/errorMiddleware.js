import ApiError from '../utils/ApiError.js';

/**
 * Centralised error-handling middleware.
 *
 * Normalises every error type the app can throw (ApiError, Mongoose validation,
 * duplicate keys, bad ObjectIds, JWT errors, Multer errors) into a consistent
 * JSON response shape:
 *
 *   { success: false, message: string, errors?: Array<{ field, message }> }
 */
// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, _next) => {
  // Log full error details in development for easier debugging
  if (process.env.NODE_ENV === 'development') {
    console.error('─── ERROR ───────────────────────────────────────');
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);
    console.error('─────────────────────────────────────────────────');
  }

  let statusCode = 500;
  let message = 'Internal server error';
  let errors = [];

  // ── Our custom ApiError ────────────────────────────────────────────────────
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  }
  // ── Mongoose Validation Error (schema-level) ───────────────────────────────
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }
  // ── Mongoose CastError (invalid ObjectId in URL params) ────────────────────
  else if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }
  // ── MongoDB Duplicate Key (code 11000) ─────────────────────────────────────
  else if (err.code === 11000) {
    statusCode = 409;
    // err.keyValue looks like { email: "taken@example.com" }
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value: '${field}' already exists`;
    errors = [{ field, message: `${field} already exists` }];
  }
  // ── JWT Errors ─────────────────────────────────────────────────────────────
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }
  // ── Multer Errors (file upload) ────────────────────────────────────────────
  else if (err.name === 'MulterError') {
    statusCode = 400;
    const multerMessages = {
      LIMIT_FILE_SIZE: 'File size exceeds the 2 MB limit',
      LIMIT_FILE_COUNT: 'Too many files uploaded',
      LIMIT_FIELD_KEY: 'Field name is too long',
      LIMIT_FIELD_VALUE: 'Field value is too long',
      LIMIT_FIELD_COUNT: 'Too many fields',
      LIMIT_UNEXPECTED_FILE: `Unexpected file field: '${err.field}'`,
    };
    message = multerMessages[err.code] || 'File upload error';
  }

  // Send the response
  const response = { success: false, message };
  if (errors.length > 0) response.errors = errors;

  res.status(statusCode).json(response);
};

export default errorMiddleware;
