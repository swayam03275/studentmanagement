import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';

/**
 * Authentication middleware — protects routes that require a logged-in admin.
 *
 * Expects an Authorization header in the format: Bearer <token>
 * Decodes the JWT, looks up the admin, and attaches them to req.admin.
 */
const protect = async (req, _res, next) => {
  try {
    // 1. Extract token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw ApiError.unauthorized('Access denied. No token provided.');
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the admin and exclude the password from the result
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      throw ApiError.unauthorized('Admin account not found. Token is invalid.');
    }

    // 4. Attach admin to the request for downstream handlers
    req.admin = admin;
    next();
  } catch (error) {
    // Re-throw ApiErrors as-is; convert JWT library errors to ApiError
    if (error instanceof ApiError) {
      return next(error);
    }

    if (error.name === 'JsonWebTokenError') {
      return next(ApiError.unauthorized('Invalid token.'));
    }

    if (error.name === 'TokenExpiredError') {
      return next(ApiError.unauthorized('Token has expired. Please login again.'));
    }

    next(error);
  }
};

export default protect;
