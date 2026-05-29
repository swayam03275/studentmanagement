import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * Generate a signed JWT for the given admin ID.
 * @param {string} id - The admin's MongoDB _id
 * @returns {string} Signed JWT
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * POST /api/auth/login
 * Authenticate an admin with email + password and return a JWT.
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find admin by email (include password for comparison)
    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // 2. Compare candidate password with stored hash
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // 3. Generate token and respond (strip password from response)
    const token = generateToken(admin._id);

    ApiResponse.success(res, 200, 'Login successful', {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/profile
 * Return the currently authenticated admin's profile (req.admin set by protect middleware).
 */
export const getProfile = async (req, res, next) => {
  try {
    ApiResponse.success(res, 200, 'Profile retrieved successfully', {
      admin: req.admin,
    });
  } catch (error) {
    next(error);
  }
};
