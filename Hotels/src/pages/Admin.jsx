import React, { useState, useEffect, useRef } from 'react';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Data states
  const [bookings, setBookings] = useState([]);
  const [settings, setSettings] = useState({
    hotelName: 'Imperial Polo Ground Haveli',
    address: '19, Shanti Vihar, Panch Batti Circle, Airport Road, Air Force Area, {{ADDRESS}}',
    phone: '+91 99296 79515',
    email: 'imperialhotel@gmail.com',
    whatsapp: '919929679515',
    facebook: '#',
    instagram: '#',
    twitter: '#',
    heroImage: '/hero.png'
  });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
      fetchSettings();
    }
  }, [isAuthenticated]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/settings');
      const data = await res.json();
      if (Object.keys(data).length > 0) {
        setSettings(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSettingChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving settings');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`http://localhost:3001/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setSettings({ ...settings, heroImage: 'http://localhost:3001' + data.url });
        alert('Image uploaded successfully! Remember to save settings.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <form className="admin-login-form" onSubmit={handleLoginSubmit}>
          <h2>Admin Login</h2>
          <input type="text" name="username" placeholder="Username" required onChange={handleLoginChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleLoginChange} />
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>Imperial Admin</h2>
        <ul>
          <li className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>Manage Bookings</li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Site Settings</li>
          <li onClick={() => setIsAuthenticated(false)}>Logout</li>
        </ul>
      </div>
      
      <div className="admin-content">
        {activeTab === 'bookings' && (
          <div className="admin-panel">
            <h2>Manage Bookings</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Dates</th>
                    <th>Rooms/Guests</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td>{b.name}</td>
                      <td>{b.phone}</td>
                      <td>{b.checkIn} to {b.checkOut}</td>
                      <td>{b.rooms} Room, {b.adults}A {b.children}C</td>
                      <td>{b.roomType}</td>
                      <td>
                        <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                      </td>
                      <td>
                        <select 
                          value={b.status} 
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirm</option>
                          <option value="Cancelled">Cancel</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr><td colSpan="8" className="text-center">No bookings yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="admin-panel">
            <h2>Site Settings</h2>
            <form className="settings-form" onSubmit={handleSettingsSubmit}>
              <div className="form-group">
                <label>{{CLINIC_NAME}}</label>
                <input type="text" name="hotelName" value={settings.hotelName || ''} onChange={handleSettingChange} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="address" value={settings.address || ''} onChange={handleSettingChange} rows="2"></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" name="phone" value={settings.phone || ''} onChange={handleSettingChange} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={settings.email || ''} onChange={handleSettingChange} />
                </div>
              </div>
              <div className="form-group">
                <label>WhatsApp Number (include country code, e.g., 919929679515)</label>
                <input type="text" name="whatsapp" value={settings.whatsapp || ''} onChange={handleSettingChange} />
              </div>
              
              <h3 className="mt-4 mb-2">Social Handles</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Facebook URL</label>
                  <input type="text" name="facebook" value={settings.facebook || ''} onChange={handleSettingChange} />
                </div>
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input type="text" name="instagram" value={settings.instagram || ''} onChange={handleSettingChange} />
                </div>
                <div className="form-group">
                  <label>Twitter URL</label>
                  <input type="text" name="twitter" value={settings.twitter || ''} onChange={handleSettingChange} />
                </div>
              </div>

              <h3 className="mt-4 mb-2">Media & Photos</h3>
              <div className="form-group">
                <label>Hero Image</label>
                <div className="image-upload-preview">
                  <img src={settings.heroImage} alt="Hero Preview" style={{maxWidth: '200px', marginBottom: '10px'}} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    ref={fileInputRef}
                  />
                  <small>Or enter URL directly:</small>
                  <input type="text" name="heroImage" value={settings.heroImage || ''} onChange={handleSettingChange} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-4">Save All Settings</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
