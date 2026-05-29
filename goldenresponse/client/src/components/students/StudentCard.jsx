import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';

function StudentCard({ student, index = 0, onDelete }) {
  const navigate = useNavigate();

  return (
    <div
      className="glass-card-hover p-4 animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start gap-3">
        {/* Photo */}
        {student.photograph ? (
          <img
            src={
              student.photograph.startsWith('http')
                ? student.photograph
                : `http://localhost:5000/${student.photograph}`
            }
            alt={student.fullName}
            className="w-14 h-14 rounded-xl object-cover border-2 border-gray-700 flex-shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-gray-700 flex items-center justify-center text-indigo-400 font-bold text-lg flex-shrink-0">
            {student.fullName?.charAt(0)?.toUpperCase()}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-200 truncate">
            {student.fullName}
          </h3>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {student.email}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {student.currentCourse}
            </span>
            <span className="text-[10px] text-gray-500 font-mono">
              #{student.rollNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800/50">
        <button
          onClick={() => navigate(`/students/${student._id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all duration-200"
        >
          <Eye className="w-3.5 h-3.5" />
          View
        </button>
        <button
          onClick={() => navigate(`/students/edit/${student._id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition-all duration-200"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => onDelete(student)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-all duration-200"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
