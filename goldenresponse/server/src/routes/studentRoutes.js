import { Router } from 'express';
import protect from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validators/studentValidator.js';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
} from '../controllers/studentController.js';

const router = Router();

// All student routes require authentication
router.use(protect);

// ── Search (must come before /:id to avoid treating "search" as an id) ───────
router.get('/search', searchStudents);

// ── List & Create ────────────────────────────────────────────────────────────
router.get('/', getAllStudents);
router.post('/', upload, validate(createStudentSchema), createStudent);

// ── Single student operations ────────────────────────────────────────────────
router.get('/:id', getStudentById);
router.put('/:id', upload, validate(updateStudentSchema), updateStudent);
router.delete('/:id', deleteStudent);

export default router;
