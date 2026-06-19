import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Settings, Dumbbell, Users, Calendar, RefreshCw, Plus, Edit2, Trash2, CheckCircle, Save } from 'lucide-react';
import { dataStore } from '../utils/dataStore';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('branding');
  const [successMsg, setSuccessMsg] = useState('');
  
  // State for branding settings
  const [branding, setBranding] = useState({
    seoTitle: '',
    seoDesc: '',
    heroHeadline: '',
    heroSubheading: '',
    aboutStory: '',
    mission: '',
    vision: '',
    address: '',
    phone: '',
    email: '',
    primaryColor: '#e2f13c'
  });

  // State for listings
  const [programs, setPrograms] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [classes, setClasses] = useState([]);

  // Editor states
  const [editingProgram, setEditingProgram] = useState(null);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [editingClass, setEditingClass] = useState(null);

  // Load datasets on mount
  useEffect(() => {
    const content = dataStore.getContent();
    const storedColor = localStorage.getItem('gym_primary_color') || '#e2f13c';
    
    setBranding({ ...content, primaryColor: storedColor });
    setPrograms(dataStore.getPrograms());
    setTrainers(dataStore.getTrainers());
    setClasses(dataStore.getClasses());
    
    window.scrollTo(0, 0);
  }, []);

  const triggerNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // 1. Save Branding Settings
  const handleSaveBranding = (e) => {
    e.preventDefault();
    const { primaryColor, ...contentData } = branding;
    
    // Save content to dataStore
    dataStore.saveContent(contentData);
    
    // Save primary color to localStorage and inject directly to document body
    localStorage.setItem('gym_primary_color', primaryColor);
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    
    // Trigger global navbar update if listening
    window.dispatchEvent(new Event('storage'));
    
    triggerNotification('Branding & theme color successfully updated!');
  };

  const handleColorChange = (color) => {
    setBranding(prev => ({ ...prev, primaryColor: color }));
    // Live update color as user drags to showcase dynamic rendering
    document.documentElement.style.setProperty('--primary-color', color);
  };

  // 2. Program Actions
  const handleSaveProgram = (e) => {
    e.preventDefault();
    let updated;
    if (editingProgram.isNew) {
      const newProg = { ...editingProgram, id: 'prog-' + Date.now() };
      delete newProg.isNew;
      updated = [...programs, newProg];
    } else {
      updated = programs.map(p => p.id === editingProgram.id ? editingProgram : p);
    }
    setPrograms(updated);
    dataStore.savePrograms(updated);
    setEditingProgram(null);
    triggerNotification('Programs catalog updated!');
  };

  const handleDeleteProgram = (id) => {
    const updated = programs.filter(p => p.id !== id);
    setPrograms(updated);
    dataStore.savePrograms(updated);
    triggerNotification('Program deleted.');
  };

  // 3. Trainer Actions
  const handleSaveTrainer = (e) => {
    e.preventDefault();
    let updated;
    if (editingTrainer.isNew) {
      const newTrainer = { ...editingTrainer, id: 'train-' + Date.now() };
      delete newTrainer.isNew;
      updated = [...trainers, newTrainer];
    } else {
      updated = trainers.map(t => t.id === editingTrainer.id ? editingTrainer : t);
    }
    setTrainers(updated);
    dataStore.saveTrainers(updated);
    setEditingTrainer(null);
    triggerNotification('Trainer roster updated!');
  };

  const handleDeleteTrainer = (id) => {
    const updated = trainers.filter(t => t.id !== id);
    setTrainers(updated);
    dataStore.saveTrainers(updated);
    triggerNotification('Trainer removed.');
  };

  // 4. Class Actions
  const handleSaveClass = (e) => {
    e.preventDefault();
    let updated;
    if (editingClass.isNew) {
      const newClass = { ...editingClass, id: 'class-' + Date.now() };
      delete newClass.isNew;
      updated = [...classes, newClass];
    } else {
      updated = classes.map(c => c.id === editingClass.id ? editingClass : c);
    }
    setClasses(updated);
    dataStore.saveClasses(updated);
    setEditingClass(null);
    triggerNotification('Weekly schedule updated!');
  };

  const handleDeleteClass = (id) => {
    const updated = classes.filter(c => c.id !== id);
    setClasses(updated);
    dataStore.saveClasses(updated);
    triggerNotification('Class slot deleted.');
  };

  return (
    <div className="admin-page">
      {/* Subpage Hero */}
      <section className="page-hero admin-hero">
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Template Control Console</span>
          <h1>Admin <span>Dashboard</span></h1>
          <p>Configure dynamic tokens, modify page content, customize the primary brand color, and manage catalogs.</p>
        </div>
      </section>

      {/* Main CMS interface */}
      <section className="section admin-cms-sec">
        <div className="container">
          <div className="admin-layout-wrapper">
            
            {/* Sidebar navigation */}
            <div className="admin-sidebar glass-card">
              <button 
                className={`sidebar-tab-btn ${activeTab === 'branding' ? 'active' : ''}`}
                onClick={() => setActiveTab('branding')}
              >
                <Settings size={18} />
                <span>Branding & Tokens</span>
              </button>

              <button 
                className={`sidebar-tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
                onClick={() => setActiveTab('programs')}
              >
                <Dumbbell size={18} />
                <span>Programs CMS</span>
              </button>

              <button 
                className={`sidebar-tab-btn ${activeTab === 'trainers' ? 'active' : ''}`}
                onClick={() => setActiveTab('trainers')}
              >
                <Users size={18} />
                <span>Trainers CMS</span>
              </button>

              <button 
                className={`sidebar-tab-btn ${activeTab === 'classes' ? 'active' : ''}`}
                onClick={() => setActiveTab('classes')}
              >
                <Calendar size={18} />
                <span>Classes CMS</span>
              </button>

              <div className="sidebar-footer-box">
                <button 
                  className="btn btn-outline reset-all-btn"
                  onClick={() => { if(confirm('Reset all values to template defaults?')) dataStore.resetAll(); }}
                >
                  <RefreshCw size={14} />
                  <span>Reset Default Data</span>
                </button>
              </div>
            </div>

            {/* Main Editor panel */}
            <div className="admin-main-panel glass-card">
              
              {/* Success Banner */}
              <AnimatePresence>
                {successMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="admin-success-banner"
                  >
                    <CheckCircle size={18} />
                    <span>{successMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* TAB 1: BRANDING & TOKENS */}
              {activeTab === 'branding' && (
                <form className="admin-form" onSubmit={handleSaveBranding}>
                  <div className="admin-tab-header">
                    <h2>White-Label Brand Tokens</h2>
                    <p>Dynamic parameters mapping variables across headers, forms, contacts, and WhatsApp links.</p>
                  </div>

                  <div className="grid grid-2 form-row-grid">
                    <div className="form-group">
                      <label className="form-label">Accent Theme Variable (PRIMARY_COLOR)</label>
                      <div className="color-picker-group">
                        <input 
                          type="color" 
                          className="color-control-picker" 
                          value={branding.primaryColor}
                          onChange={(e) => handleColorChange(e.target.value)}
                        />
                        <input 
                          type="text" 
                          className="form-control hex-val-input" 
                          value={branding.primaryColor}
                          onChange={(e) => handleColorChange(e.target.value)}
                        />
                      </div>
                      <span className="field-hint">Dynamically updates the theme variables in real-time.</span>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Clinic / Brand Name Token (CLINIC_NAME)</label>
                      <input 
                        type="text" 
                        required 
                        className="form-control"
                        placeholder="{{CLINIC_NAME}}"
                        value={branding.seoTitle.includes('{{CLINIC_NAME}}') ? 'Dynamic Demo Gym' : branding.seoTitle.split('|')[0].trim()}
                        onChange={(e) => {
                          const newName = e.target.value;
                          setBranding({
                            ...branding,
                            seoTitle: `${newName} | Premium International Fitness & Wellness Club`,
                            seoDesc: `Unlock your physical potential with ${newName}. Advanced coaching, premium equipment.`
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-2 form-row-grid">
                    <div className="form-group">
                      <label className="form-label">Phone Token (PHONE)</label>
                      <input 
                        type="text" 
                        required 
                        className="form-control"
                        value={branding.phone}
                        onChange={(e) => setBranding({ ...branding, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Address Token (ADDRESS)</label>
                      <input 
                        type="text" 
                        required 
                        className="form-control"
                        value={branding.address}
                        onChange={(e) => setBranding({ ...branding, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hero Headline</label>
                    <input 
                      type="text" 
                      required 
                      className="form-control"
                      value={branding.heroHeadline}
                      onChange={(e) => setBranding({ ...branding, heroHeadline: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hero Subheading</label>
                    <textarea 
                      className="form-control text-control" 
                      rows="3"
                      value={branding.heroSubheading}
                      onChange={(e) => setBranding({ ...branding, heroSubheading: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">About Brand Narrative</label>
                    <textarea 
                      className="form-control text-control" 
                      rows="4"
                      value={branding.aboutStory}
                      onChange={(e) => setBranding({ ...branding, aboutStory: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary admin-submit-btn">
                    <Save size={16} /> Save Branding & Theme
                  </button>
                </form>
              )}

              {/* TAB 2: PROGRAMS CMS */}
              {activeTab === 'programs' && (
                <div className="admin-cms-listing">
                  <div className="admin-tab-header-flex">
                    <div>
                      <h2>Programs Management</h2>
                      <p>Add, edit, or remove fitness packages appearing in the training section.</p>
                    </div>
                    <button 
                      className="btn btn-primary add-item-btn"
                      onClick={() => setEditingProgram({ title: '', desc: '', img: '/assets/weight-training.jpg', category: 'Strength', isNew: true })}
                    >
                      <Plus size={16} /> Add Program
                    </button>
                  </div>

                  {editingProgram ? (
                    <form className="admin-editor-form glass-card" onSubmit={handleSaveProgram}>
                      <h3>{editingProgram.isNew ? 'New Program' : 'Edit Program'}</h3>
                      
                      <div className="form-group">
                        <label className="form-label">Program Title</label>
                        <input 
                          type="text" 
                          required 
                          className="form-control"
                          value={editingProgram.title}
                          onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-2 form-row-grid">
                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <select 
                            className="form-control select-control"
                            value={editingProgram.category}
                            onChange={(e) => setEditingProgram({ ...editingProgram, category: e.target.value })}
                          >
                            <option>Strength</option>
                            <option>Conditioning</option>
                            <option>Coaching</option>
                            <option>Cardio</option>
                            <option>Wellness</option>
                            <option>Group</option>
                            <option>Combat</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Mock Image Asset Name</label>
                          <input 
                            type="text" 
                            required 
                            className="form-control"
                            value={editingProgram.img}
                            onChange={(e) => setEditingProgram({ ...editingProgram, img: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea 
                          className="form-control text-control" 
                          rows="3"
                          required
                          value={editingProgram.desc}
                          onChange={(e) => setEditingProgram({ ...editingProgram, desc: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="editor-btn-group">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="button" className="btn btn-outline" onClick={() => setEditingProgram(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="list-items-table">
                      {programs.map((prog) => (
                        <div key={prog.id} className="list-item-row">
                          <div className="list-item-details">
                            <strong>{prog.title}</strong>
                            <span>{prog.category}</span>
                          </div>
                          <div className="list-item-actions">
                            <button className="icon-btn-edit" onClick={() => setEditingProgram(prog)} aria-label="Edit program">
                              <Edit2 size={16} />
                            </button>
                            <button className="icon-btn-delete" onClick={() => handleDeleteProgram(prog.id)} aria-label="Delete program">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TRAINERS CMS */}
              {activeTab === 'trainers' && (
                <div className="admin-cms-listing">
                  <div className="admin-tab-header-flex">
                    <div>
                      <h2>Trainers Roster</h2>
                      <p>Manage trainers, bio credentials, certificates, and photo displays.</p>
                    </div>
                    <button 
                      className="btn btn-primary add-item-btn"
                      onClick={() => setEditingTrainer({ name: '', role: '', certs: '', img: '/assets/personal-trainer.jpg', social: { instagram: '#', facebook: '#', twitter: '#' }, isNew: true })}
                    >
                      <Plus size={16} /> Add Coach
                    </button>
                  </div>

                  {editingTrainer ? (
                    <form className="admin-editor-form glass-card" onSubmit={handleSaveTrainer}>
                      <h3>{editingTrainer.isNew ? 'New Coach' : 'Edit Coach'}</h3>

                      <div className="form-group">
                        <label className="form-label">Coach Name</label>
                        <input 
                          type="text" 
                          required 
                          className="form-control"
                          value={editingTrainer.name}
                          onChange={(e) => setEditingTrainer({ ...editingTrainer, name: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-2 form-row-grid">
                        <div className="form-group">
                          <label className="form-label">Role Specialization</label>
                          <input 
                            type="text" 
                            required 
                            className="form-control"
                            value={editingTrainer.role}
                            onChange={(e) => setEditingTrainer({ ...editingTrainer, role: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Mock Image Asset Name</label>
                          <input 
                            type="text" 
                            required 
                            className="form-control"
                            value={editingTrainer.img}
                            onChange={(e) => setEditingTrainer({ ...editingTrainer, img: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Certificates & Credentials</label>
                        <input 
                          type="text" 
                          required 
                          className="form-control"
                          placeholder="e.g. CSCS, NASM, CrossFit L2"
                          value={editingTrainer.certs}
                          onChange={(e) => setEditingTrainer({ ...editingTrainer, certs: e.target.value })}
                        />
                      </div>

                      <div className="editor-btn-group">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="button" className="btn btn-outline" onClick={() => setEditingTrainer(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="list-items-table">
                      {trainers.map((trainer) => (
                        <div key={trainer.id} className="list-item-row">
                          <div className="list-item-details">
                            <strong>{trainer.name}</strong>
                            <span>{trainer.role}</span>
                          </div>
                          <div className="list-item-actions">
                            <button className="icon-btn-edit" onClick={() => setEditingTrainer(trainer)} aria-label="Edit trainer">
                              <Edit2 size={16} />
                            </button>
                            <button className="icon-btn-delete" onClick={() => handleDeleteTrainer(trainer.id)} aria-label="Remove trainer">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CLASSES CMS */}
              {activeTab === 'classes' && (
                <div className="admin-cms-listing">
                  <div className="admin-tab-header-flex">
                    <div>
                      <h2>Class Schedule Calendar</h2>
                      <p>Configure weekly booking slots, start times, difficulty parameters, and trainers.</p>
                    </div>
                    <button 
                      className="btn btn-primary add-item-btn"
                      onClick={() => setEditingClass({ day: 'Monday', time: '08:00 AM', name: 'Strength Training', level: 'Intermediate', trainer: 'Marcus Vance', isNew: true })}
                    >
                      <Plus size={16} /> Add Class Slot
                    </button>
                  </div>

                  {editingClass ? (
                    <form className="admin-editor-form glass-card" onSubmit={handleSaveClass}>
                      <h3>{editingClass.isNew ? 'Add Timetable Slot' : 'Edit Timetable Slot'}</h3>

                      <div className="grid grid-2 form-row-grid">
                        <div className="form-group">
                          <label className="form-label">Class Name</label>
                          <input 
                            type="text" 
                            required 
                            className="form-control"
                            value={editingClass.name}
                            onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Assigned Coach</label>
                          <select 
                            className="form-control select-control"
                            value={editingClass.trainer}
                            onChange={(e) => setEditingClass({ ...editingClass, trainer: e.target.value })}
                          >
                            {trainers.map(t => <option key={t.id}>{t.name}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-3 form-row-grid">
                        <div className="form-group">
                          <label className="form-label">Day</label>
                          <select 
                            className="form-control select-control"
                            value={editingClass.day}
                            onChange={(e) => setEditingClass({ ...editingClass, day: e.target.value })}
                          >
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Start Time</label>
                          <input 
                            type="text" 
                            required 
                            className="form-control"
                            placeholder="e.g. 08:00 AM"
                            value={editingClass.time}
                            onChange={(e) => setEditingClass({ ...editingClass, time: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Intensity Level</label>
                          <select 
                            className="form-control select-control"
                            value={editingClass.level}
                            onChange={(e) => setEditingClass({ ...editingClass, level: e.target.value })}
                          >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div className="editor-btn-group">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="button" className="btn btn-outline" onClick={() => setEditingClass(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="list-items-table">
                      {classes.map((cls) => (
                        <div key={cls.id} className="list-item-row">
                          <div className="list-item-details">
                            <strong>{cls.name}</strong>
                            <span>{cls.day} at {cls.time} | Coach: {cls.trainer}</span>
                          </div>
                          <div className="list-item-actions">
                            <button className="icon-btn-edit" onClick={() => setEditingClass(cls)} aria-label="Edit class">
                              <Edit2 size={16} />
                            </button>
                            <button className="icon-btn-delete" onClick={() => handleDeleteClass(cls.id)} aria-label="Delete class">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
