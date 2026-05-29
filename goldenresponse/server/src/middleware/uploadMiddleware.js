import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

/**
 * Multer disk storage configuration.
 * Files are saved to the ./uploads/ directory with a unique filename to
 * prevent collisions: student-<timestamp>-<random hex>.<ext>
 */
const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, './uploads/');
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
    cb(null, `student-${uniqueSuffix}${ext}`);
  },
});

/**
 * File filter — only allow common image MIME types.
 * Rejects anything that isn't JPEG, PNG, or WebP.
 */
const fileFilter = (_req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError(
        'LIMIT_UNEXPECTED_FILE',
        'Only JPEG, PNG, and WebP images are allowed'
      ),
      false
    );
  }
};

/**
 * Configured multer instance for single-file photograph uploads.
 * - Max file size: 2 MB
 * - Field name: 'photograph'
 */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
}).single('photograph');

export default upload;
