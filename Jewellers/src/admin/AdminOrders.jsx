import React from 'react';
import { Search, Eye, Download } from 'lucide-react';

const AdminOrders = () => {
  return (
    <div className="admin-orders">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Orders</h1>
      </div>

      <div className="admin-card">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
          <div style={{position: 'relative', width: '300px'}}>
            <Search size={18} style={{position: 'absolute', left: '10px', top: '10px', color: '#94a3b8'}} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              style={{
                width: '100%', 
                padding: '8px 10px 8px 35px', 
                border: '1px solid #e2e8f0', 
                borderRadius: '4px'
              }} 
            />
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <select style={{padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px'}}>
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Returned</option>
            </select>
            <button className="btn btn-outline" style={{padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '5px'}}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Fulfillment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#ORD-001', date: 'May 14, 2026', name: 'John Doe', total: 120.00, pay: 'Paid', status: 'Delivered', sClass: 'success' },
                { id: '#ORD-002', date: 'May 14, 2026', name: 'Sarah Smith', total: 245.00, pay: 'Paid', status: 'Shipped', sClass: 'blue' },
                { id: '#ORD-003', date: 'May 13, 2026', name: 'Michael Lee', total: 85.00, pay: 'Pending', status: 'Processing', sClass: 'warning' },
                { id: '#ORD-004', date: 'May 12, 2026', name: 'Emma Davis', total: 310.00, pay: 'Paid', status: 'Delivered', sClass: 'success' },
                { id: '#ORD-005', date: 'May 10, 2026', name: 'Chris Wilson', total: 45.00, pay: 'Refunded', status: 'Returned', sClass: 'warning' },
              ].map(order => (
                <tr key={order.id}>
                  <td style={{fontWeight: '500'}}>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.name}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td><span className={`admin-badge badge-${order.pay === 'Paid' ? 'success' : 'warning'}`}>{order.pay}</span></td>
                  <td><span className={`admin-badge badge-${order.sClass}`}>{order.status}</span></td>
                  <td>
                    <button style={{color: '#64748b'}} title="View Details"><Eye size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
