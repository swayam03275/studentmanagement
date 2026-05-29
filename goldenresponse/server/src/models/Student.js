import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    // ── Personal Information ───────────────────────────────────────────────────
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not a valid gender',
      },
    },
    photograph: {
      type: String, // URL or file path to the uploaded photo
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'],
    },
    alternateMobile: {
      type: String,
      match: [/^[0-9]{10}$/, 'Alternate mobile must be exactly 10 digits'],
    },

    // ── Parent / Guardian Information ──────────────────────────────────────────
    fatherName: {
      type: String,
      required: [true, "Father's name is required"],
      trim: true,
    },
    motherName: {
      type: String,
      required: [true, "Mother's name is required"],
      trim: true,
    },
    fatherMobile: {
      type: String,
      match: [/^[0-9]{10}$/, "Father's mobile must be exactly 10 digits"],
    },
    motherMobile: {
      type: String,
      match: [/^[0-9]{10}$/, "Mother's mobile must be exactly 10 digits"],
    },
    guardianName: {
      type: String,
      trim: true,
    },
    guardianContact: {
      type: String,
      match: [/^[0-9]{10}$/, 'Guardian contact must be exactly 10 digits'],
    },

    // ── Academic Information ───────────────────────────────────────────────────
    tenthPercentage: {
      type: Number,
      required: [true, '10th percentage is required'],
      min: [0, '10th percentage cannot be less than 0'],
      max: [100, '10th percentage cannot exceed 100'],
    },
    twelfthPercentage: {
      type: Number,
      required: [true, '12th percentage is required'],
      min: [0, '12th percentage cannot be less than 0'],
      max: [100, '12th percentage cannot exceed 100'],
    },
    boardOfEducation: {
      type: String,
      required: [true, 'Board of education is required'],
      trim: true,
    },
    currentCourse: {
      type: String,
      required: [true, 'Current course is required'],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true,
      trim: true,
      index: true,
    },
    admissionNumber: {
      type: String,
      required: [true, 'Admission number is required'],
      unique: true,
      trim: true,
      index: true,
    },
    passingYear: {
      type: Number,
      required: [true, 'Passing year is required'],
    },

    // ── Additional Information ─────────────────────────────────────────────────
    caste: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: ['General', 'OBC', 'SC', 'ST', 'Other'],
        message: '{VALUE} is not a valid category',
      },
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
      default: 'India',
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Compound text index enables efficient $text searches across the three most
 * commonly queried string fields. Weights prioritise rollNumber and fullName
 * over email in relevance scoring.
 */
studentSchema.index(
  { fullName: 'text', email: 'text', rollNumber: 'text' },
  { weights: { fullName: 3, rollNumber: 2, email: 1 } }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
