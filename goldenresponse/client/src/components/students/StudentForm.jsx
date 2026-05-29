import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Users,
  GraduationCap,
  MapPin,
  Upload,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import { studentFormSchema } from '../../validators/studentSchema';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import {
  GENDER_OPTIONS,
  CATEGORY_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  COURSE_OPTIONS,
  BOARD_OPTIONS,
  STATE_OPTIONS,
  PASSING_YEAR_OPTIONS,
} from '../../utils/constants';

function StudentForm({ initialData, onSubmit, isSubmitting = false }) {
  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      mobileNumber: '',
      alternateMobile: '',
      fatherName: '',
      motherName: '',
      fatherMobile: '',
      motherMobile: '',
      guardianName: '',
      guardianContact: '',
      tenthPercentage: '',
      twelfthPercentage: '',
      boardOfEducation: '',
      currentCourse: '',
      rollNumber: '',
      admissionNumber: '',
      passingYear: '',
      caste: '',
      category: '',
      bloodGroup: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
    },
  });

  // Pre-populate for edit mode
  useEffect(() => {
    if (initialData) {
      const formData = {
        ...initialData,
        dateOfBirth: initialData.dateOfBirth
          ? new Date(initialData.dateOfBirth).toISOString().split('T')[0]
          : '',
        tenthPercentage: initialData.tenthPercentage?.toString() || '',
        twelfthPercentage: initialData.twelfthPercentage?.toString() || '',
        passingYear: initialData.passingYear?.toString() || '',
        alternateMobile: initialData.alternateMobile || '',
        fatherMobile: initialData.fatherMobile || '',
        motherMobile: initialData.motherMobile || '',
        guardianName: initialData.guardianName || '',
        guardianContact: initialData.guardianContact || '',
        caste: initialData.caste || '',
        bloodGroup: initialData.bloodGroup || '',
        country: initialData.country || 'India',
      };
      reset(formData);

      // Set photo preview for existing photo
      if (initialData.photograph) {
        setPhotoPreview(
          initialData.photograph.startsWith('http')
            ? initialData.photograph
            : `http://localhost:5000/${initialData.photograph}`
        );
      }
    }
  }, [initialData, reset]);

  // Handle photo upload
  const handlePhotoChange = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) handlePhotoChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handlePhotoChange(file);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  // Form submission
  const handleFormSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });

    if (photoFile) {
      formData.append('photograph', photoFile);
    }

    onSubmit(formData);
  };

  const SectionHeader = ({ icon: Icon, title, subtitle }) => (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-700/50">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-8 animate-fade-in"
    >
      {/* ───────────────── Section 1: Personal Information ───────────────── */}
      <div className="glass-card p-6">
        <SectionHeader
          icon={User}
          title="Personal Information"
          subtitle="Basic details about the student"
        />

        {/* Photo Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Student Photograph
          </label>
          <div className="flex items-start gap-4">
            {/* Preview */}
            {photoPreview ? (
              <div className="relative group">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-xl object-cover border-2 border-gray-700 group-hover:border-indigo-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}

            {/* Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                flex-1 min-h-[120px] rounded-xl border-2 border-dashed
                flex flex-col items-center justify-center gap-2 p-4
                cursor-pointer transition-all duration-300
                ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-gray-700/50 hover:border-gray-600 bg-gray-800/30'
                }
              `}
              onClick={() => document.getElementById('photo-input').click()}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  dragActive ? 'bg-indigo-500/20' : 'bg-gray-800'
                }`}
              >
                {dragActive ? (
                  <ImageIcon className="w-5 h-5 text-indigo-400" />
                ) : (
                  <Upload className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-300">
                  {dragActive
                    ? 'Drop image here'
                    : 'Click to upload or drag & drop'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Personal Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="Full Name"
            placeholder="Enter full name"
            error={errors.fullName?.message}
            required
            {...register('fullName')}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="student@example.com"
            error={errors.email?.message}
            required
            {...register('email')}
          />
          <Input
            label="Date of Birth"
            type="date"
            error={errors.dateOfBirth?.message}
            required
            {...register('dateOfBirth')}
          />
          <Select
            label="Gender"
            options={GENDER_OPTIONS}
            placeholder="Select gender"
            error={errors.gender?.message}
            required
            {...register('gender')}
          />
          <Input
            label="Mobile Number"
            type="tel"
            placeholder="10-digit mobile number"
            error={errors.mobileNumber?.message}
            required
            {...register('mobileNumber')}
          />
          <Input
            label="Alternate Mobile"
            type="tel"
            placeholder="10-digit mobile number"
            error={errors.alternateMobile?.message}
            {...register('alternateMobile')}
          />
        </div>
      </div>

      {/* ───────────────── Section 2: Parent / Guardian ───────────────── */}
      <div className="glass-card p-6">
        <SectionHeader
          icon={Users}
          title="Parent / Guardian Information"
          subtitle="Family and emergency contact details"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="Father's Name"
            placeholder="Enter father's name"
            error={errors.fatherName?.message}
            required
            {...register('fatherName')}
          />
          <Input
            label="Mother's Name"
            placeholder="Enter mother's name"
            error={errors.motherName?.message}
            required
            {...register('motherName')}
          />
          <Input
            label="Father's Mobile"
            type="tel"
            placeholder="10-digit mobile number"
            error={errors.fatherMobile?.message}
            {...register('fatherMobile')}
          />
          <Input
            label="Mother's Mobile"
            type="tel"
            placeholder="10-digit mobile number"
            error={errors.motherMobile?.message}
            {...register('motherMobile')}
          />
          <Input
            label="Guardian Name"
            placeholder="Enter guardian's name"
            error={errors.guardianName?.message}
            {...register('guardianName')}
          />
          <Input
            label="Guardian Contact"
            type="tel"
            placeholder="10-digit contact number"
            error={errors.guardianContact?.message}
            {...register('guardianContact')}
          />
        </div>
      </div>

      {/* ───────────────── Section 3: Academic Information ───────────────── */}
      <div className="glass-card p-6">
        <SectionHeader
          icon={GraduationCap}
          title="Academic Information"
          subtitle="Educational background and current enrollment"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="10th Percentage"
            type="number"
            placeholder="e.g. 85.5"
            error={errors.tenthPercentage?.message}
            required
            step="0.01"
            {...register('tenthPercentage')}
          />
          <Input
            label="12th Percentage"
            type="number"
            placeholder="e.g. 90.2"
            error={errors.twelfthPercentage?.message}
            required
            step="0.01"
            {...register('twelfthPercentage')}
          />
          <Select
            label="Board of Education"
            options={BOARD_OPTIONS}
            placeholder="Select board"
            error={errors.boardOfEducation?.message}
            required
            {...register('boardOfEducation')}
          />
          <Select
            label="Current Course"
            options={COURSE_OPTIONS}
            placeholder="Select course"
            error={errors.currentCourse?.message}
            required
            {...register('currentCourse')}
          />
          <Input
            label="Roll Number"
            placeholder="Enter roll number"
            error={errors.rollNumber?.message}
            required
            {...register('rollNumber')}
          />
          <Input
            label="Admission Number"
            placeholder="Enter admission number"
            error={errors.admissionNumber?.message}
            required
            {...register('admissionNumber')}
          />
          <Select
            label="Passing Year"
            options={PASSING_YEAR_OPTIONS}
            placeholder="Select year"
            error={errors.passingYear?.message}
            required
            {...register('passingYear')}
          />
        </div>
      </div>

      {/* ───────────────── Section 4: Additional Information ───────────────── */}
      <div className="glass-card p-6">
        <SectionHeader
          icon={MapPin}
          title="Additional Information"
          subtitle="Category, address, and other details"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="Caste"
            placeholder="Enter caste"
            error={errors.caste?.message}
            {...register('caste')}
          />
          <Select
            label="Category"
            options={CATEGORY_OPTIONS}
            placeholder="Select category"
            error={errors.category?.message}
            required
            {...register('category')}
          />
          <Select
            label="Blood Group"
            options={BLOOD_GROUP_OPTIONS}
            placeholder="Select blood group"
            error={errors.bloodGroup?.message}
            {...register('bloodGroup')}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Address <span className="text-rose-400">*</span>
          </label>
          <textarea
            placeholder="Enter full address"
            rows={3}
            {...register('address')}
            className={`
              w-full bg-gray-800/50 border rounded-xl px-4 py-2.5
              text-sm text-gray-100 placeholder-gray-500
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none
              ${
                errors.address
                  ? 'border-rose-500/50 focus:ring-rose-500/30 focus:border-rose-500'
                  : 'border-gray-700/50 focus:ring-indigo-500/30 focus:border-indigo-500/50 hover:border-gray-600'
              }
            `}
          />
          {errors.address && (
            <p className="mt-1.5 text-xs text-rose-400 animate-fade-in">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Input
            label="City"
            placeholder="Enter city"
            error={errors.city?.message}
            required
            {...register('city')}
          />
          <Select
            label="State"
            options={STATE_OPTIONS}
            placeholder="Select state"
            error={errors.state?.message}
            required
            {...register('state')}
          />
          <Input
            label="Country"
            placeholder="Enter country"
            error={errors.country?.message}
            required
            {...register('country')}
          />
          <Input
            label="Pincode"
            placeholder="6-digit pincode"
            error={errors.pincode?.message}
            required
            {...register('pincode')}
          />
        </div>
      </div>

      {/* ───────────────── Actions ───────────────── */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          isLoading={isSubmitting}
        >
          {isEditMode ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
}

export default StudentForm;
