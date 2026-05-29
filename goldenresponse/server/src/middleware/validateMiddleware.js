import { ZodError } from 'zod';
import ApiError from '../utils/ApiError.js';

/**
 * Factory that returns Express middleware to validate req.body against a Zod schema.
 *
 * On success the parsed (and potentially transformed/coerced) data replaces
 * req.body so downstream handlers always work with clean, typed values.
 *
 * On validation failure the Zod issues are mapped to a flat { field, message }
 * array and wrapped in an ApiError for the centralised error handler.
 *
 * @param {import('zod').ZodSchema} schema - The Zod schema to validate against
 * @returns {import('express').RequestHandler}
 */
const validate = (schema) => {
  return (req, _res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        next(ApiError.badRequest('Validation failed', errors));
      } else {
        next(error);
      }
    }
  };
};

export default validate;
