import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles = {
  '/': 'Dashboard',
  '/students': 'Student Records',
  '/students/add': 'Add New Student',
};

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.startsWith('/students/edit')) return 'Edit Student';
    if (location.pathname.match(/^\/students\/[a-zA-Z0-9]+$/) && !location.pathname.includes('add')) {
      return 'Student Details';
    }
    return pageTitles[location.pathname] || 'Dashboard';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title={getTitle()}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
