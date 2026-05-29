import { z } from 'zod';

const phoneRegex = /^[0-9]{10}$/;
const pincodeRegex = /^[0-9]{6}$/;

export const studentFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email format is invalid'),

  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required'),

  gender: z
    .enum(['Male', 'Female', 'Other'], {
      errorMap: () => ({ message: 'Please select a valid gender' }),
    }),

  mobileNumber: z
    .string()
    .min(1, 'Mobile number is required')
    .regex(phoneRegex, 'Mobile number must contain exactly 10 digits'),

  alternateMobile: z
    .string()
    .regex(phoneRegex, 'Alternate mobile must contain exactly 10 digits')
    .or(z.literal(''))
    .optional(),

  fatherName: z
    .string()
    .min(2, "Father's name must be at least 2 characters")
    .max(100, "Father's name must not exceed 100 characters"),

  motherName: z
    .string()
    .min(2, "Mother's name must be at least 2 characters")
    .max(100, "Mother's name must not exceed 100 characters"),

  fatherMobile: z
    .string()
    .regex(phoneRegex, "Father's mobile must contain exactly 10 digits")
    .or(z.literal(''))
    .optional(),

  motherMobile: z
    .string()
    .regex(phoneRegex, "Mother's mobile must contain exactly 10 digits")
    .or(z.literal(''))
    .optional(),

  guardianName: z
    .string()
    .max(100, "Guardian's name must not exceed 100 characters")
    .optional()
    .or(z.literal('')),

  guardianContact: z
    .string()
    .regex(phoneRegex, "Guardian's contact must contain exactly 10 digits")
    .or(z.literal(''))
    .optional(),

  tenthPercentage: z
    .coerce
    .number({ invalid_type_error: '10th percentage must be a number' })
    .min(0, '10th percentage must be at least 0')
    .max(100, '10th percentage cannot exceed 100'),

  twelfthPercentage: z
    .coerce
    .number({ invalid_type_error: '12th percentage must be a number' })
    .min(0, '12th percentage must be at least 0')
    .max(100, '12th percentage cannot exceed 100'),

  boardOfEducation: z
    .string()
    .min(1, 'Board of education is required')
    .max(100, 'Board name must not exceed 100 characters'),

  currentCourse: z
    .string()
    .min(1, 'Current course is required')
    .max(100, 'Course name must not exceed 100 characters'),

  rollNumber: z
    .string()
    .min(1, 'Roll number is required')
    .max(50, 'Roll number must not exceed 50 characters'),

  admissionNumber: z
    .string()
    .min(1, 'Admission number is required')
    .max(50, 'Admission number must not exceed 50 characters'),

  passingYear: z
    .coerce
    .number({ invalid_type_error: 'Passing year must be a number' })
    .min(2000, 'Passing year must be 2000 or later')
    .max(2040, 'Passing year must be 2040 or earlier'),

  caste: z
    .string()
    .max(50, 'Caste must not exceed 50 characters')
    .optional()
    .or(z.literal('')),

  category: z
    .enum(['General', 'OBC', 'SC', 'ST', 'Other'], {
      errorMap: () => ({ message: 'Please select a valid category' }),
    }),

  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', ''], {
      errorMap: () => ({ message: 'Please select a valid blood group' }),
    })
    .optional(),

  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must not exceed 500 characters'),

  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters'),

  state: z
    .string()
    .min(2, 'State is required')
    .max(100, 'State must not exceed 100 characters'),

  country: z
    .string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country must not exceed 100 characters')
    .default('India'),

  pincode: z
    .string()
    .min(1, 'Pincode is required')
    .regex(pincodeRegex, 'Pincode must contain exactly 6 digits'),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
