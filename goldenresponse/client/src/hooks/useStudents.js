import { useState, useCallback } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

function useStudents() {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = {
        page: params.page || 1,
        limit: params.limit || 10,
        sort: params.sort || '-createdAt',
        ...(params.search && { search: params.search }),
        ...(params.gender && { gender: params.gender }),
        ...(params.category && { category: params.category }),
        ...(params.currentCourse && { currentCourse: params.currentCourse }),
        ...(params.passingYear && { passingYear: params.passingYear }),
      };

      const response = await api.get('/students', { params: queryParams });

      if (response.data.success) {
        setStudents(response.data.data.students);
        setPagination(response.data.data.pagination);
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch students';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteStudent = useCallback(async (id) => {
    try {
      const response = await api.delete(`/students/${id}`);
      if (response.data.success) {
        setStudents((prev) => prev.filter((s) => s._id !== id));
        setPagination((prev) => ({
          ...prev,
          total: prev.total - 1,
        }));
        toast.success('Student deleted successfully');
        return true;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete student';
      toast.error(message);
      return false;
    }
  }, []);

  return {
    students,
    pagination,
    loading,
    error,
    fetchStudents,
    deleteStudent,
  };
}

export default useStudents;
