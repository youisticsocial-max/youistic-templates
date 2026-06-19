import React from 'react';
import { Search, Mail, ExternalLink } from 'lucide-react';

const AdminCustomers = () => {
  return (
    <div className="admin-customers">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Customers</h1>
      </div>

      <div className="admin-card">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
          <div style={{position: 'relative', width: '300px'}}>
            <Search size={18} style={{position: 'absolute', left: '10px', top: '10px', color: '#94a3b8'}} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              style={{
                width: '100%', 
                padding: '8px 10px 8px 35px', 
                border: '1px solid #e2e8f0', 
                borderRadius: '4px'
              }} 
            />
          </div>
          <div>
            <select style={{padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px'}}>
              <option>Sort by: Newest</option>
              <option>Sort by: Most Orders</option>
              <option>Sort by: Highest Spent</option>
            </select>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'John Doe', email: 'john@example.com', loc: 'New York, USA', orders: 5, spent: 850.00 },
                { name: 'Sarah Smith', email: 'sarah@example.com', loc: 'London, UK', orders: 12, spent: 2450.00 },
                { name: 'Michael Lee', email: 'michael@example.com', loc: 'Sydney, AUS', orders: 1, spent: 85.00 },
                { name: 'Emma Davis', email: 'emma@example.com', loc: 'Toronto, CAN', orders: 3, spent: 410.00 },
                { name: 'Chris Wilson', email: 'chris@example.com', loc: 'Berlin, GER', orders: 2, spent: 145.00 },
              ].map((c, i) => (
                <tr key={i}>
                  <td style={{fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div className="admin-avatar" style={{width:'30px', height:'30px', fontSize:'0.75rem'}}>
                      {c.name.charAt(0)}
                    </div>
                    {c.name}
                  </td>
                  <td>{c.email}</td>
                  <td>{c.loc}</td>
                  <td>{c.orders}</td>
                  <td>${c.spent.toFixed(2)}</td>
                  <td>
                    <button style={{marginRight: '10px', color: '#64748b'}} title="Email"><Mail size={18} /></button>
                    <button style={{color: '#64748b'}} title="View Profile"><ExternalLink size={18} /></button>
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

export default AdminCustomers;
