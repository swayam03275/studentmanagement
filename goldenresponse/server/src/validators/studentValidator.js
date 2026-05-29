import { z } from 'zod';

// ── Reusable patterns ────────────────────────────────────────────────────────
const mobileRegex = /^[0-9]{10}$/;
const pincodeRegex = /^[0-9]{6}$/;

const categoryEnum = ['General', 'OBC', 'SC', 'ST', 'Other'];
const bloodGroupEnum = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const genderEnum = ['Male', 'Female', 'Other'];

/**
 * Helper: optional mobile field.
 * Allows empty strings (from multipart forms) and transforms them to undefined
 * so Mongoose doesn't store empty strings.
 */
const optionalMobile = z
  .string()
  .transform((val) => (val === '' ? undefined : val))
  .pipe(
    z
      .string()
      .regex(mobileRegex, 'Mobile number must contain 10 digits')
      .optional()
  );

// ── Create Student Schema ────────────────────────────────────────────────────

export const createStudentSchema = z.object({
  // Personal
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .toLowerCase()
    .email('Email format is invalid'),
  dateOfBirth: z
    .string({ required_error: 'Date of birth is required' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Date of birth must be a valid date string',
    }),
  gender: z.enum(genderEnum, {
    errorMap: () => ({ message: 'Gender must be Male, Female, or Other' }),
  }),
  mobileNumber: z
    .string({ required_error: 'Mobile number is required' })
    .regex(mobileRegex, 'Mobile number must contain 10 digits'),
  alternateMobile: optionalMobile.optional(),

  // Parent / Guardian
  fatherName: z
    .string({ required_error: "Father's name is required" })
    .trim()
    .min(2, "Father's name must be at least 2 characters"),
  motherName: z
    .string({ required_error: "Mother's name is required" })
    .trim()
    .min(2, "Mother's name must be at least 2 characters"),
  fatherMobile: optionalMobile.optional(),
  motherMobile: optionalMobile.optional(),
  guardianName: z.string().trim().optional(),
  guardianContact: optionalMobile.optional(),

  // Academic — use coerce so stringified numbers from multipart forms are parsed
  tenthPercentage: z.coerce
    .number({ required_error: '10th percentage is required', invalid_type_error: '10th percentage must be a number' })
    .min(0, '10th percentage cannot be less than 0')
    .max(100, '10th percentage cannot exceed 100'),
  twelfthPercentage: z.coerce
    .number({ required_error: '12th percentage is required', invalid_type_error: '12th percentage must be a number' })
    .min(0, '12th percentage cannot be less than 0')
    .max(100, '12th percentage cannot exceed 100'),
  boardOfEducation: z
    .string({ required_error: 'Board of education is required' })
    .trim()
    .min(2, 'Board of education must be at least 2 characters'),
  currentCourse: z
    .string({ required_error: 'Current course is required' })
    .trim()
    .min(2, 'Current course must be at least 2 characters'),
  rollNumber: z
    .string({ required_error: 'Roll number is required' })
    .trim()
    .min(1, 'Roll number is required'),
  admissionNumber: z
    .string({ required_error: 'Admission number is required' })
    .trim()
    .min(1, 'Admission number is required'),
  passingYear: z.coerce
    .number({ required_error: 'Passing year is required', invalid_type_error: 'Passing year must be a number' })
    .int('Passing year must be an integer')
    .min(1990, 'Passing year must be 1990 or later')
    .max(2040, 'Passing year cannot exceed 2040'),

  // Additional
  caste: z.string().trim().optional(),
  category: z
    .enum(categoryEnum, {
      errorMap: () => ({
        message: `Category must be one of: ${categoryEnum.join(', ')}`,
      }),
    })
    .optional(),
  bloodGroup: z
    .enum(bloodGroupEnum, {
      errorMap: () => ({
        message: `Blood group must be one of: ${bloodGroupEnum.join(', ')}`,
      }),
    })
    .optional(),
  address: z
    .string({ required_error: 'Address is required' })
    .trim()
    .min(5, 'Address must be at least 5 characters'),
  city: z
    .string({ required_error: 'City is required' })
    .trim()
    .min(2, 'City must be at least 2 characters'),
  state: z
    .string({ required_error: 'State is required' })
    .trim()
    .min(2, 'State must be at least 2 characters'),
  country: z
    .string()
    .trim()
    .min(2, 'Country must be at least 2 characters')
    .default('India'),
  pincode: z
    .string({ required_error: 'Pincode is required' })
    .regex(pincodeRegex, 'Pincode must contain 6 digits'),
});

// ── Update Student Schema ────────────────────────────────────────────────────
// All fields are optional so partial updates work correctly.
export const updateStudentSchema = createStudentSchema.partial();

// ── Query Schema (list / search) ─────────────────────────────────────────────
export const querySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  sort: z.string().trim().optional(),
  search: z.string().trim().optional(),
  gender: z.enum(genderEnum).optional(),
  category: z.enum(categoryEnum).optional(),
  currentCourse: z.string().trim().optional(),
  passingYear: z.coerce.number().int().optional(),
});
