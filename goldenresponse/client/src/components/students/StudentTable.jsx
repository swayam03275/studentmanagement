import { Eye, Pencil, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudentCard from './StudentCard';

function StudentTable({ students, loading, onDelete }) {
  const navigate = useNavigate();

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-3">
        {/* Desktop Skeleton */}
        <div className="hidden md:block glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                {['Photo', 'Name', 'Email', 'Course', 'Roll No', 'Actions'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-800/50">
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 rounded-full skeleton" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 skeleton" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-40 skeleton" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-28 skeleton" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 skeleton" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 skeleton" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Skeleton */}
        <div className="md:hidden space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full skeleton" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 skeleton" />
                  <div className="h-3 w-40 skeleton" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-8 w-16 skeleton rounded-lg" />
                <div className="h-8 w-16 skeleton rounded-lg" />
                <div className="h-8 w-16 skeleton rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!students || students.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
          <User className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          No Students Found
        </h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          No student records match your current filters. Try adjusting your search
          criteria or add a new student.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50 bg-gray-800/30">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Photo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  className="group hover:bg-gray-800/30 transition-all duration-200 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => navigate(`/students/${student._id}`)}
                >
                  <td className="px-6 py-4">
                    {student.photograph ? (
                      <img
                        src={
                          student.photograph.startsWith('http')
                            ? student.photograph
                            : `http://localhost:5000/${student.photograph}`
                        }
                        alt={student.fullName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-700 group-hover:border-indigo-500/50 transition-colors"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-gray-700 flex items-center justify-center text-indigo-400 font-bold text-sm">
                        {student.fullName?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                      {student.fullName}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-400">
                      {student.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {student.currentCourse}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-400 font-mono">
                      {student.rollNumber}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className="flex items-center justify-end gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => navigate(`/students/${student._id}`)}
                        className="p-2 rounded-lg text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-200"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/students/edit/${student._id}`)
                        }
                        className="p-2 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(student)}
                        className="p-2 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {students.map((student, index) => (
          <StudentCard
            key={student._id}
            student={student}
            index={index}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}

export default StudentTable;
