import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import StudentsListPage from '../pages/StudentsListPage';
import AddStudentPage from '../pages/AddStudentPage';
import EditStudentPage from '../pages/EditStudentPage';
import ViewStudentPage from '../pages/ViewStudentPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="students" element={<StudentsListPage />} />
        <Route path="students/add" element={<AddStudentPage />} />
        <Route path="students/edit/:id" element={<EditStudentPage />} />
        <Route path="students/:id" element={<ViewStudentPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
