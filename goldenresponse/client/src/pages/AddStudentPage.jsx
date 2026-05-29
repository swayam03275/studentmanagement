import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import StudentForm from '../components/students/StudentForm';

function AddStudentPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await api.post('/students', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Student added successfully!');
      navigate('/students');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to add student. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 page-enter">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link
          to="/"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <Link
          to="/students"
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          Students
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <span className="text-indigo-400 font-medium">Add New</span>
      </nav>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Add New Student
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Fill in the details below to register a new student record
        </p>
      </div>

      {/* Form */}
      <StudentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}

export default AddStudentPage;
