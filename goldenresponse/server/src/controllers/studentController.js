import fs from 'fs/promises';
import path from 'path';
import Student from '../models/Student.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * Helper: safely delete a file from disk (used for photograph cleanup).
 * Silently ignores errors if the file no longer exists.
 */
const deleteFile = async (filePath) => {
  try {
    if (filePath) {
      // filePath stored in DB looks like '/uploads/student-xxx.jpg'
      // Resolve it relative to the project root
      const fullPath = path.resolve(`.${filePath}`);
      await fs.unlink(fullPath);
    }
  } catch (err) {
    // File may have already been removed — log but don't throw
    if (err.code !== 'ENOENT') {
      console.warn(`Warning: could not delete file ${filePath}:`, err.message);
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// CRUD Operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/students
 * Create a new student record. If a photograph was uploaded via multer,
 * store its path.
 */
export const createStudent = async (req, res, next) => {
  try {
    const studentData = { ...req.body };

    // Attach photograph path if a file was uploaded
    if (req.file) {
      studentData.photograph = `/uploads/${req.file.filename}`;
    }

    const student = await Student.create(studentData);

    ApiResponse.created(res, 'Student created successfully', { student });
  } catch (error) {
    // If creation fails and a file was uploaded, clean it up
    if (req.file) {
      await deleteFile(`/uploads/${req.file.filename}`);
    }
    next(error);
  }
};

/**
 * GET /api/students
 * List students with pagination, sorting, filtering, and text search.
 *
 * Query params:
 *   page, limit       — pagination (defaults: 1, 10)
 *   sort               — field to sort by, prefix '-' for descending
 *   search             — text search across fullName, email, rollNumber
 *   gender, category, currentCourse, passingYear — exact-match filters
 */
export const getAllStudents = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      search,
      gender,
      category,
      currentCourse,
      passingYear,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Build the filter object
    const filter = {};

    if (gender) filter.gender = gender;
    if (category) filter.category = category;
    if (currentCourse) filter.currentCourse = currentCourse;
    if (passingYear) filter.passingYear = parseInt(passingYear, 10);

    /**
     * For search we use case-insensitive regex across multiple fields rather
     * than $text so that partial matches work (e.g. searching "Joh" matches "John").
     * $text only matches whole words / stems.
     */
    if (search && search.trim()) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(escapedSearch, 'i');
      filter.$or = [
        { fullName: searchRegex },
        { email: searchRegex },
        { rollNumber: searchRegex },
      ];
    }

    // Execute query and count in parallel for performance
    const [students, total] = await Promise.all([
      Student.find(filter).sort(sort).skip(skip).limit(limitNum).lean(),
      Student.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    ApiResponse.success(res, 200, 'Students retrieved successfully', {
      students,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/students/:id
 * Retrieve a single student by MongoDB ObjectId.
 */
export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      throw ApiError.notFound('Student not found');
    }

    ApiResponse.success(res, 200, 'Student retrieved successfully', { student });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/students/:id
 * Update a student. If a new photograph is uploaded, the old one is deleted.
 */
export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      // Clean up any uploaded file if the student doesn't exist
      if (req.file) {
        await deleteFile(`/uploads/${req.file.filename}`);
      }
      throw ApiError.notFound('Student not found');
    }

    // If a new photograph is uploaded, delete the old one first
    if (req.file) {
      await deleteFile(student.photograph);
      req.body.photograph = `/uploads/${req.file.filename}`;
    }

    // Apply updates from the validated body
    Object.assign(student, req.body);
    const updatedStudent = await student.save();

    ApiResponse.success(res, 200, 'Student updated successfully', {
      student: updatedStudent,
    });
  } catch (error) {
    // Clean up uploaded file on failure
    if (req.file) {
      await deleteFile(`/uploads/${req.file.filename}`);
    }
    next(error);
  }
};

/**
 * DELETE /api/students/:id
 * Delete a student and remove their photograph from disk.
 */
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      throw ApiError.notFound('Student not found');
    }

    // Remove photograph file from disk if one exists
    await deleteFile(student.photograph);

    // Delete the document
    await Student.findByIdAndDelete(req.params.id);

    ApiResponse.success(res, 200, 'Student deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/students/search?q=<query>
 * Dedicated search endpoint — searches across fullName, email, rollNumber
 * using case-insensitive regex. Supports pagination.
 */
export const searchStudents = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q || !q.trim()) {
      throw ApiError.badRequest('Search query "q" is required');
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Escape special regex characters in user input to avoid ReDoS
    const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchRegex = new RegExp(escapedQuery, 'i');

    const filter = {
      $or: [
        { fullName: searchRegex },
        { email: searchRegex },
        { rollNumber: searchRegex },
      ],
    };

    const [students, total] = await Promise.all([
      Student.find(filter).sort('-createdAt').skip(skip).limit(limitNum).lean(),
      Student.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    ApiResponse.success(res, 200, 'Search results retrieved successfully', {
      students,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
