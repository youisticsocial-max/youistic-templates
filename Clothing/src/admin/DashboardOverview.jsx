import React from 'react';
import { DollarSign, ShoppingBag, Users, Activity, TrendingUp } from 'lucide-react';

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Overview</h1>
        <button className="btn btn-primary">Generate Report</button>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon"><DollarSign size={24} /></div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <div className="stat-value">$24,590.00</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon"><ShoppingBag size={24} /></div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <div className="stat-value">342</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-info">
            <h3>Total Visitors</h3>
            <div className="stat-value">12,450</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><Activity size={24} /></div>
          <div className="stat-info">
            <h3>Conversion Rate</h3>
            <div className="stat-value">2.8%</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="admin-card">
          <h3 className="mb-md">Recent Orders</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-001</td>
                  <td>John Doe</td>
                  <td><span className="admin-badge badge-success">Delivered</span></td>
                  <td>$120.00</td>
                </tr>
                <tr>
                  <td>#ORD-002</td>
                  <td>Sarah Smith</td>
                  <td><span className="admin-badge badge-blue">Shipped</span></td>
                  <td>$245.00</td>
                </tr>
                <tr>
                  <td>#ORD-003</td>
                  <td>Michael Lee</td>
                  <td><span className="admin-badge badge-warning">Processing</span></td>
                  <td>$85.00</td>
                </tr>
                <tr>
                  <td>#ORD-004</td>
                  <td>Emma Davis</td>
                  <td><span className="admin-badge badge-success">Delivered</span></td>
                  <td>$310.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="mb-md">Low Stock Alerts</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Essential Cotton Crew (M)</td>
                  <td>Essentials</td>
                  <td><span className="text-danger font-weight-bold">2 left</span></td>
                </tr>
                <tr>
                  <td>Silk Blend Slip Dress (S)</td>
                  <td>Women</td>
                  <td><span className="text-danger font-weight-bold">0 left</span></td>
                </tr>
                <tr>
                  <td>Premium Wool Overcoat (L)</td>
                  <td>Men</td>
                  <td><span className="text-danger font-weight-bold">4 left</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
