import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../index.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div style={{ padding: '0 20px', marginBottom: '30px' }}>
          <h2>{"{{CLINIC_NAME}}"} Admin</h2>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 20px' }}>
          <Link to="/admin" style={{ color: '#fff' }}>Dashboard</Link>
          <Link to="/admin/products" style={{ color: '#fff' }}>Products</Link>
          <Link to="/admin/distributors" style={{ color: '#fff' }}>Distributors</Link>
          <Link to="/" style={{ color: '#bbb', marginTop: '20px' }}>Back to Site</Link>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
