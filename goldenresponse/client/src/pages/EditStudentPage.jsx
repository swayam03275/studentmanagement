import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Home, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import StudentForm from '../components/students/StudentForm';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';

function EditStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/students/${id}`);
        if (response.data.success) {
          setStudent(response.data.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          toast.error('Failed to load student data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await api.put(`/students/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Student updated successfully!');
      navigate(`/students/${id}`);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to update student. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="lg" text="Loading student data..." />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-20 page-enter">
        <div className="w-16 h-16 mb-4 rounded-full bg-rose-500/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-rose-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Student Not Found
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          The student record you&apos;re trying to edit doesn&apos;t exist.
        </p>
        <Button onClick={() => navigate('/students')}>
          Back to Students
        </Button>
      </div>
    );
  }

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
        <span className="text-indigo-400 font-medium">Edit</span>
      </nav>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Edit Student
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Update the details for{' '}
          <span className="text-indigo-400 font-medium">
            {student?.fullName}
          </span>
        </p>
      </div>

      {/* Form */}
      <StudentForm
        initialData={student}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default EditStudentPage;
