import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function Header({ onMenuToggle, title }) {
  const { admin } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-xl border-b border-gray-700/50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Left: Menu button + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {title && (
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {title}
              </h2>
            </div>
          )}
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-gray-950" />
          </button>

          {/* Profile */}
          <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-gray-700/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20">
              {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-200">
                {admin?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
    </header>
  );
}

export default Header;
