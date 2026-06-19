import React from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { products } from '../data/products';

const AdminProducts = () => {
  return (
    <div className="admin-products">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Products</h1>
        <button className="btn btn-primary"><Plus size={18} style={{marginRight: '5px'}}/> Add Product</button>
      </div>

      <div className="admin-card">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
          <div style={{position: 'relative', width: '300px'}}>
            <Search size={18} style={{position: 'absolute', left: '10px', top: '10px', color: '#94a3b8'}} />
            <input 
              type="text" 
              placeholder="Search products..." 
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
              <option>All Categories</option>
              <option>Men</option>
              <option>Women</option>
              <option>Essentials</option>
            </select>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img 
                      src={`../${product.image}`} 
                      alt={product.name} 
                      style={{width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover'}} 
                      onError={(e) => { e.target.src = 'https://placehold.co/40x40/eeeeee/666666'; }}
                    />
                  </td>
                  <td style={{fontWeight: '500'}}>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td><span className="admin-badge badge-success">In Stock</span></td>
                  <td>
                    <button style={{marginRight: '10px', color: '#3b82f6'}} title="Edit"><Edit size={18} /></button>
                    <button style={{color: '#ef4444'}} title="Delete"><Trash2 size={18} /></button>
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

export default AdminProducts;
