import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, Image as ImageIcon, FileText, MessageSquare, FolderOpen, Settings as SettingsIcon, LogOut } from 'lucide-react';
import './Admin.css';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Link to="/">
            <img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x120/1a1a1a/ffffff?text=LUXURY+BRAND&font=playfair-display' }} />
          </Link>
          <span className="admin-badge">Admin</span>
        </div>
        
        <nav className="admin-nav">
          <ul>
            <li><Link to="/admin"><LayoutDashboard size={20} /> Dashboard</Link></li>
            <li><Link to="/admin/products"><Package size={20} /> Products</Link></li>
            <li><Link to="/admin/brands"><Tag size={20} /> Brands</Link></li>
            <li><Link to="/admin/gallery"><ImageIcon size={20} /> Gallery</Link></li>
            <li><Link to="/admin/content"><FileText size={20} /> Content</Link></li>
            <li><Link to="/admin/inquiries"><MessageSquare size={20} /> Inquiries</Link></li>
            <li><Link to="/admin/media"><FolderOpen size={20} /> Media Library</Link></li>
            <li><Link to="/admin/settings"><SettingsIcon size={20} /> Settings</Link></li>
          </ul>
        </nav>
        
        <div className="admin-logout">
          <Link to="/"><LogOut size={20} /> Back to Store</Link>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header">
          <h2>Admin Dashboard</h2>
          <div className="admin-user">
            <span>Admin User</span>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
