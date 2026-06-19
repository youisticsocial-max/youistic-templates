import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Factory, Users, Target, FileText, 
  Image as ImageIcon, Settings, LogOut, Menu, X, Bell 
} from 'lucide-react';
import './Admin.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <Package size={20} />, label: 'Product Management' },
    { path: '/admin/manufacturing', icon: <Factory size={20} />, label: 'Manufacturing CMS' },
    { path: '/admin/leads', icon: <Users size={20} />, label: 'Lead Management' },
    { path: '/admin/content', icon: <FileText size={20} />, label: 'Content Management' },
    { path: '/admin/media', icon: <ImageIcon size={20} />, label: 'Media Library' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Security & Settings' },
  ];

  return (
    <div className="admin-wrapper bg-dark text-main min-h-screen flex">
      {/* Sidebar */}
      <aside className={`admin-sidebar bg-card border-r border-subtle transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-4 border-b border-subtle flex items-center justify-between h-16">
          {sidebarOpen && <img src={"{{LOGO_URL}}".includes('{') ? '/assets/logo.png' : "{{LOGO_URL}}"} alt={"{{CLINIC_NAME}}"} className="h-8 object-contain" />}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted hover:text-white mx-auto">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.label}
              to={item.path}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-primary text-white' : 'text-muted hover:bg-subtle hover:text-white'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="ml-4 font-semibold tracking-wide whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-subtle">
          <Link to="/" className="flex items-center px-4 py-3 text-muted hover:text-white transition-colors">
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span className="ml-4">Exit Admin</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-card border-b border-subtle flex items-center justify-between px-8">
          <h2 className="text-xl font-heading tracking-wider">Manufacturing CMS Panel</h2>
          <div className="flex items-center gap-6">
            <button className="relative text-muted hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold">A</div>
              <span className="text-sm font-semibold hidden md:block">Admin User</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
