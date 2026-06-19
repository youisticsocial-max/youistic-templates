import React from 'react';
import { Users, ShoppingCart, DollarSign, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <div className="value">$45,231</div>
          <p className="text-success">+20.1% from last month</p>
        </div>
        <div className="stat-card">
          <h3>Active Inquiries</h3>
          <div className="value">+2350</div>
          <p className="text-success">+180.1% from last month</p>
        </div>
        <div className="stat-card">
          <h3>Products Sold</h3>
          <div className="value">+12,234</div>
          <p className="text-success">+19% from last month</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <div className="value">+573</div>
          <p className="text-success">+201 since last hour</p>
        </div>
      </div>

      <div className="admin-table-container">
        <div style={{padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-color)'}}>
          <h3 style={{margin: 0}}>Recent Inquiries</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td><span className="badge" style={{background: '#e0f2f1', color: '#00897b'}}>New</span></td>
              <td>2023-10-24</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>jane@example.com</td>
              <td><span className="badge" style={{background: '#fff3e0', color: '#fb8c00'}}>Contacted</span></td>
              <td>2023-10-23</td>
            </tr>
            <tr>
              <td>Robert Johnson</td>
              <td>robert@example.com</td>
              <td><span className="badge" style={{background: '#e8f5e9', color: '#43a047'}}>Converted</span></td>
              <td>2023-10-22</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
