import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight,
  Home,
  Pencil,
  Trash2,
  ArrowLeft,
  User,
  Users,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Droplets,
  Hash,
  BookOpen,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import DeleteModal from '../components/students/DeleteModal';

function ViewStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
          toast.error('Failed to load student details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/students/${id}`);
      if (response.data.success) {
        toast.success('Student deleted successfully');
        navigate('/students');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const InfoField = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-3 py-2.5">
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className="w-4 h-4 text-gray-500" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm text-gray-200 font-medium break-words">
          {value || '—'}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="lg" text="Loading student details..." />
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
          The student record you&apos;re looking for doesn&apos;t exist.
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
        <span className="text-indigo-400 font-medium truncate max-w-[150px]">
          {student?.fullName}
        </span>
      </nav>

      {/* Profile Header Card */}
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/8 to-transparent rounded-full blur-3xl -mr-32 -mt-32" />

        <div className="relative flex flex-col sm:flex-row items-start gap-6">
          {/* Photo */}
          <div className="relative group">
            {student.photograph ? (
              <img
                src={
                  student.photograph.startsWith('http')
                    ? student.photograph
                    : `http://localhost:5000/${student.photograph}`
                }
                alt={student.fullName}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-gray-700 shadow-xl group-hover:border-indigo-500/50 transition-colors"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-2 border-gray-700 flex items-center justify-center">
                <User className="w-12 h-12 text-indigo-400/50" />
              </div>
            )}
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-2xl blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {student.fullName}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                <Mail className="w-3.5 h-3.5" />
                {student.email}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                <Phone className="w-3.5 h-3.5" />
                {student.mobileNumber}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                {student.currentCourse}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/20">
                Roll: {student.rollNumber}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                {student.gender}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              onClick={() => navigate('/students')}
            >
              Back
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Pencil}
              onClick={() => navigate(`/students/edit/${id}`)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Detail Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Personal */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-700/50">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center">
              <User className="w-4 h-4 text-indigo-400" />
            </div>
            <h2 className="text-base font-semibold text-white">
              Personal Information
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <InfoField label="Full Name" value={student.fullName} icon={User} />
            <InfoField label="Email" value={student.email} icon={Mail} />
            <InfoField
              label="Date of Birth"
              value={formatDate(student.dateOfBirth)}
              icon={Calendar}
            />
            <InfoField label="Gender" value={student.gender} icon={User} />
            <InfoField
              label="Mobile Number"
              value={student.mobileNumber}
              icon={Phone}
            />
            <InfoField
              label="Alternate Mobile"
              value={student.alternateMobile}
              icon={Phone}
            />
          </div>
        </div>

        {/* Section 2: Parent/Guardian */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-700/50">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-base font-semibold text-white">
              Parent / Guardian
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <InfoField
              label="Father's Name"
              value={student.fatherName}
              icon={User}
            />
            <InfoField
              label="Mother's Name"
              value={student.motherName}
              icon={User}
            />
            <InfoField
              label="Father's Mobile"
              value={student.fatherMobile}
              icon={Phone}
            />
            <InfoField
              label="Mother's Mobile"
              value={student.motherMobile}
              icon={Phone}
            />
            <InfoField
              label="Guardian Name"
              value={student.guardianName}
              icon={User}
            />
            <InfoField
              label="Guardian Contact"
              value={student.guardianContact}
              icon={Phone}
            />
          </div>
        </div>

        {/* Section 3: Academic */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-700/50">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-violet-500/30 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-violet-400" />
            </div>
            <h2 className="text-base font-semibold text-white">
              Academic Information
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <InfoField
              label="10th Percentage"
              value={student.tenthPercentage ? `${student.tenthPercentage}%` : null}
              icon={BookOpen}
            />
            <InfoField
              label="12th Percentage"
              value={student.twelfthPercentage ? `${student.twelfthPercentage}%` : null}
              icon={BookOpen}
            />
            <InfoField
              label="Board of Education"
              value={student.boardOfEducation}
              icon={GraduationCap}
            />
            <InfoField
              label="Current Course"
              value={student.currentCourse}
              icon={GraduationCap}
            />
            <InfoField
              label="Roll Number"
              value={student.rollNumber}
              icon={Hash}
            />
            <InfoField
              label="Admission Number"
              value={student.admissionNumber}
              icon={Hash}
            />
            <InfoField
              label="Passing Year"
              value={student.passingYear}
              icon={Calendar}
            />
          </div>
        </div>

        {/* Section 4: Additional */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-700/50">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <h2 className="text-base font-semibold text-white">
              Additional Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <InfoField label="Caste" value={student.caste} icon={User} />
            <InfoField label="Category" value={student.category} icon={User} />
            <InfoField
              label="Blood Group"
              value={student.bloodGroup}
              icon={Droplets}
            />
            <InfoField label="Address" value={student.address} icon={MapPin} />
            <InfoField label="City" value={student.city} icon={MapPin} />
            <InfoField label="State" value={student.state} icon={MapPin} />
            <InfoField label="Country" value={student.country} icon={MapPin} />
            <InfoField label="Pincode" value={student.pincode} icon={Hash} />
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        studentName={student?.fullName}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default ViewStudentPage;
