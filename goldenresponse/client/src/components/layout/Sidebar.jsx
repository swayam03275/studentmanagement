import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  LogOut,
  X,
  UserCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Students',
    path: '/students',
    icon: GraduationCap,
  },
];

function Sidebar({ isOpen, onClose }) {
  const { admin, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-gray-900/80 backdrop-blur-xl
          border-r border-gray-700/50
          flex flex-col
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">
                Student<span className="text-indigo-400">MS</span>
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                text-sm font-medium
                transition-all duration-200 group
                ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-600/20 to-violet-600/20 text-white border-l-2 border-indigo-500 shadow-lg shadow-indigo-500/5'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }
              `}
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${
                  isActive(item.path)
                    ? 'text-indigo-400'
                    : 'text-gray-500 group-hover:text-gray-300'
                }`}
              />
              {item.name}
              {isActive(item.path) && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Admin Profile & Logout */}
        <div className="border-t border-gray-700/50 p-4 space-y-3">
          {/* Admin info */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">
                {admin?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {admin?.email || 'admin@system.com'}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="
              w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
              text-sm font-medium text-gray-400
              hover:text-rose-400 hover:bg-rose-500/10
              transition-all duration-200 group
            "
          >
            <LogOut className="w-4 h-4 group-hover:text-rose-400 transition-colors" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
