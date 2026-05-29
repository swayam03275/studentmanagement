import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import useStudents from '../hooks/useStudents';
import useDebounce from '../hooks/useDebounce';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import StudentTable from '../components/students/StudentTable';
import SearchBar from '../components/students/SearchBar';
import FilterPanel from '../components/students/FilterPanel';
import DeleteModal from '../components/students/DeleteModal';

function StudentsListPage() {
  const navigate = useNavigate();
  const { students, pagination, loading, fetchStudents, deleteStudent } = useStudents();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    category: '',
    currentCourse: '',
    passingYear: '',
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 400);

  // Fetch students whenever search or filters change
  const loadStudents = useCallback(
    (page = 1) => {
      fetchStudents({
        page,
        search: debouncedSearch,
        ...filters,
      });
    },
    [fetchStudents, debouncedSearch, filters]
  );

  useEffect(() => {
    loadStudents(1);
  }, [loadStudents]);

  const handlePageChange = (page) => {
    loadStudents(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      gender: '',
      category: '',
      currentCourse: '',
      passingYear: '',
    });
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStudent) return;
    setIsDeleting(true);
    const success = await deleteStudent(selectedStudent._id);
    setIsDeleting(false);
    if (success) {
      setShowDeleteModal(false);
      setSelectedStudent(null);
      // Refetch if current page might be empty
      if (students.length === 1 && pagination.page > 1) {
        loadStudents(pagination.page - 1);
      } else {
        loadStudents(pagination.page);
      }
    }
  };

  return (
    <div className="space-y-5 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Student Records
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and organize all student information
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => navigate('/students/add')}
        >
          Add New Student
        </Button>
      </div>

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      {/* Filters */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Table */}
      <StudentTable
        students={students}
        loading={loading}
        onDelete={handleDeleteClick}
      />

      {/* Pagination */}
      {!loading && students.length > 0 && (
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedStudent(null);
        }}
        onConfirm={handleConfirmDelete}
        studentName={selectedStudent?.fullName}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default StudentsListPage;
