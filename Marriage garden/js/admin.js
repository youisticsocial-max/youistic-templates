/*
 * ==========================================
 * MARRIAGE GARDENS & WEDDING RESORT TEMPLATE
 * Admin Panel & CMS Application Logic
 * ==========================================
 */

// Helper: load database
function getDb() {
    // If not initialized, app.js default data will be used, but let's make sure we have a reference
    let data = localStorage.getItem('wedding_venue_cms_data');
    if (!data) {
        // Fallback to the same default mock data
        const mockDefault = {
            tokens: {
                clinic_name: "The Royal Crest Palace & Resort",
                phone: "+1 (888) 769-2575",
                address: "100 Grand Boulevard, Heritage Springs, CA 90210",
                logo_url: "https://images.unsplash.com/photo-1546193430-c2d20e5c848a?auto=format&fit=crop&w=100&h=100&q=80",
                primary_color: "#c5a880"
            },
            venues: [
                {
                    id: 1,
                    name: "Royal Wedding Garden",
                    tag: "Outdoor Garden",
                    image: "assets/luxury-garden.jpg",
                    capacity: "1,200 Guests",
                    price: "$6,500 / Day",
                    description: "A breathtaking outdoor garden featuring manicured green lawns, stunning golden-lit fountains, a grand marble colonnade pavilion, and majestic floral arches.",
                    features: ["Marble Pavilion Mandap", "Integrated Sound System", "Private Bridal Waiting Lounge"]
                },
                {
                    id: 2,
                    name: "Grand Ballroom Hall",
                    tag: "Indoor Banquet",
                    image: "assets/banquet-hall.jpg",
                    capacity: "800 Guests",
                    price: "$5,000 / Day",
                    description: "An opulent indoor banquet hall detailed with sparkling crystal chandeliers, intricate gold-leaf moldings, velvet wall panels, and state-of-the-art climate control.",
                    features: ["18ft High Ceiling", "Pre-function Cocktail Foyer", "Professional Acoustic Panel Design"]
                },
                {
                    id: 3,
                    name: "Imperial Poolside Lawn",
                    tag: "Outdoor Lounge",
                    image: "assets/poolside-event.jpg",
                    capacity: "400 Guests",
                    price: "$4,000 / Day",
                    description: "A vibrant, elegant poolside setting perfect for cocktail hours, sangeet parties, and sunset wedding ceremonies, featuring luxury cabanas and modern lighting rigs.",
                    features: ["Floating Acrylic Stage Area", "Outdoor Cocktail Bar Setup", "Lush Palm Tree Lighting"]
                }
            ],
            rooms: [
                {
                    id: 1,
                    name: "The Palace Emperor Suite",
                    image: "assets/resort-room.jpg",
                    capacity: "2 Adults, 1 Child",
                    amenities: ["Private Jacuzzi", "King Size Bed", "24/7 Personal Butler Service", "Panoramic Garden Balcony"]
                },
                {
                    id: 2,
                    name: "Heritage Villa Suite",
                    image: "assets/hero-wedding-resort.jpg",
                    capacity: "3 Adults",
                    amenities: ["Private Plunge Pool", "Heritage Furnishings", "En-suite Luxury Bath", "Complimentary Gourmet Basket"]
                }
            ],
            packages: [
                {
                    id: 1,
                    name: "Silver Celebration Package",
                    price: "$3,500",
                    subtitle: "Elegant Essentials",
                    features: [
                        "Full venue rental for 8 Hours",
                        "Classic floral stage setup",
                        "Premium banquet chairs and covers",
                        "Basic ambient uplighting package"
                    ]
                },
                {
                    id: 2,
                    name: "Gold Royal Package",
                    price: "$7,500",
                    subtitle: "The Signature Experience",
                    featured: true,
                    features: [
                        "Lawn or Ballroom venue rental for 12 Hours",
                        "Royal thematic entrance decor & carpets",
                        "Exquisite centerpieces & table styling",
                        "Full catering service for up to 150 guests"
                    ]
                },
                {
                    id: 3,
                    name: "Platinum Grand Package",
                    price: "$15,500",
                    subtitle: "Uncompromising Opulence",
                    features: [
                        "Exclusive 24-Hour buyout of the entire estate",
                        "Premium custom floral installations throughout",
                        "5-Star international multi-cuisine catering",
                        "3-Night stay in 3 Luxury Suites"
                    ]
                }
            ],
            testimonials: [
                { id: 1, name: "Sophia & Arjun", role: "Bride & Groom", quote: "Our wedding was an absolute fairy tale. The staff transformed the Royal Garden into a royal sanctuary.", event: "Royal Garden Ceremony" }
            ],
            blogs: [
                { id: 1, title: "5 Royal Theme Ideas for Your Wedding Garden", date: "June 12, 2026", summary: "Explore how to bring palatial heritage themes into your garden.", image: "assets/event-decoration.jpg" }
            ],
            gallery: [
                { id: 1, category: "gardens", title: "Royal Garden Canopy", image: "assets/luxury-garden.jpg", size: "wide" }
            ],
            inquiries: [
                {
                    id: "INQ-2846",
                    name: "Sarah Jenkins",
                    email: "sarah.j@example.com",
                    phone: "+1 (555) 124-7890",
                    date: "2026-09-20",
                    guests: 200,
                    event_type: "Wedding",
                    package_id: 2,
                    notes: "Needs gluten-free catering options.",
                    status: "New",
                    created_at: "2026-06-18T10:15:00Z"
                }
            ]
        };
        localStorage.setItem('wedding_venue_cms_data', JSON.stringify(mockDefault));
        return mockDefault;
    }
    return JSON.parse(data);
}

function saveDb(data) {
    localStorage.setItem('wedding_venue_cms_data', JSON.stringify(data));
}

// Check Authentication
function checkAuth() {
    const isLoggedIn = localStorage.getItem('wedding_admin_logged_in');
    const authWrapper = document.getElementById('auth-wrapper');
    const dashboardWrapper = document.getElementById('dashboard-wrapper');
    
    if (!authWrapper || !dashboardWrapper) return;
    
    if (isLoggedIn === 'true') {
        authWrapper.style.display = 'none';
        dashboardWrapper.style.display = 'flex';
        initDashboard();
    } else {
        authWrapper.style.display = 'flex';
        dashboardWrapper.style.display = 'none';
        initLoginForm();
    }
}

// Login Form Handling
function initLoginForm() {
    const form = document.getElementById('admin-login-form');
    if (!form) return;
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        const username = form.username.value;
        const password = form.password.value;
        
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('wedding_admin_logged_in', 'true');
            checkAuth();
        } else {
            alert("Invalid credentials. Use 'admin' and 'admin' to sign in.");
        }
    });
}

// Global Dashboard Initialization
function initDashboard() {
    setupTabNavigation();
    renderMetrics();
    renderRecentInquiries();
    renderInquiriesTable();
    renderVenuesPanel();
    renderPackagesPanel();
    renderRoomsPanel();
    renderContentPanel();
    renderSettingsPanel();
    setupModals();
}

// Side menu Tab navigation switcher
function setupTabNavigation() {
    const links = document.querySelectorAll('.sidebar-menu-item');
    const panels = document.querySelectorAll('.admin-panel');
    
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetPanel = link.getAttribute('data-target');
            
            // Remove active classes
            links.forEach(item => item.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active-panel'));
            
            // Activate target
            link.classList.add('active');
            const activePanelNode = document.getElementById(targetPanel);
            if (activePanelNode) {
                activePanelNode.classList.add('active-panel');
            }
        });
    });
    
    // Log out button trigger
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', e => {
            e.preventDefault();
            localStorage.removeItem('wedding_admin_logged_in');
            checkAuth();
        });
    }
}

// Render top overview stats metrics
function renderMetrics() {
    const db = getDb();
    
    // Total inquiries
    const totalInquiriesVal = db.inquiries.length;
    document.getElementById('stat-total-inquiries').innerText = totalInquiriesVal;
    
    // Confirmed bookings count
    const confirmedCount = db.inquiries.filter(i => i.status === 'Confirmed').length;
    document.getElementById('stat-confirmed-bookings').innerText = confirmedCount;
    
    // Upcoming events: inquiries dated today or in future
    const today = new Date().toISOString().split('T')[0];
    const upcomingCount = db.inquiries.filter(i => i.date >= today && i.status !== 'Completed').length;
    document.getElementById('stat-upcoming-events').innerText = upcomingCount;
    
    // Expected Revenue: Sum of package costs for confirmed bookings
    let revenueSum = 0;
    db.inquiries.forEach(inq => {
        if (inq.status === 'Confirmed' && inq.package_id) {
            const pkg = db.packages.find(p => p.id === inq.package_id);
            if (pkg) {
                // Parse package price (e.g. $7,500 -> 7500)
                const priceNum = parseInt(pkg.price.replace(/[^0-9]/g, '')) || 0;
                revenueSum += priceNum;
            }
        }
    });
    document.getElementById('stat-expected-revenue').innerText = '$' + revenueSum.toLocaleString();
}

// Render Recent Inquiries List on main dashboard panel
function renderRecentInquiries() {
    const db = getDb();
    const tableBody = document.getElementById('recent-inquiries-body');
    if (!tableBody) return;
    
    let html = '';
    // Sort recent inquiries first
    const sorted = [...db.inquiries].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
    
    if (sorted.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No inquiries received yet.</td></tr>';
        return;
    }
    
    sorted.forEach(inq => {
        const pkg = db.packages.find(p => p.id === inq.package_id);
        const pkgName = pkg ? pkg.name : 'Custom / Venue Visit';
        html += `
        <tr>
            <td><strong>${inq.name}</strong></td>
            <td>${inq.event_type}</td>
            <td>${inq.date}</td>
            <td>${pkgName}</td>
            <td><span class="badge badge-${inq.status.toLowerCase()}">${inq.status}</span></td>
        </tr>`;
    });
    tableBody.innerHTML = html;
}

// Render Inquiries Management Table
function renderInquiriesTable() {
    const db = getDb();
    const tableBody = document.getElementById('inquiries-table-body');
    if (!tableBody) return;
    
    let html = '';
    if (db.inquiries.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No inquiry records found.</td></tr>';
        return;
    }
    
    db.inquiries.forEach(inq => {
        const pkg = db.packages.find(p => p.id === inq.package_id);
        const pkgName = pkg ? pkg.name : 'Not Selected';
        
        html += `
        <tr data-inq-id="${inq.id}">
            <td><strong>${inq.id}</strong></td>
            <td>${inq.name}<br><small style="color:var(--text-admin-muted);">${inq.phone}</small></td>
            <td>${inq.event_type}<br><small style="color:var(--text-admin-muted);">${inq.date}</small></td>
            <td>${inq.guests} Guests</td>
            <td>
                <select class="admin-status-select" style="padding: 0.25rem 0.5rem; font-size:0.75rem; border-radius:4px;" data-id="${inq.id}">
                    <option value="New" ${inq.status === 'New' ? 'selected' : ''}>New</option>
                    <option value="Contacted" ${inq.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                    <option value="Visit Scheduled" ${inq.status === 'Visit Scheduled' ? 'selected' : ''}>Visit Scheduled</option>
                    <option value="Confirmed" ${inq.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="Completed" ${inq.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
            <td>${inq.notes ? inq.notes.substring(0, 30) + '...' : '-'}</td>
            <td>
                <button class="admin-btn admin-btn-secondary admin-btn-small view-inq-btn" data-id="${inq.id}">View</button>
                <button class="admin-btn admin-btn-danger admin-btn-small delete-inq-btn" data-id="${inq.id}">Delete</button>
            </td>
        </tr>`;
    });
    tableBody.innerHTML = html;
    
    // Register actions
    // Status change listener
    tableBody.querySelectorAll('.admin-status-select').forEach(select => {
        select.addEventListener('change', e => {
            const id = e.target.getAttribute('data-id');
            const newStatus = e.target.value;
            
            const database = getDb();
            const index = database.inquiries.findIndex(i => i.id === id);
            if (index !== -1) {
                database.inquiries[index].status = newStatus;
                saveDb(database);
                renderMetrics();
                renderRecentInquiries();
            }
        });
    });
    
    // View action listener
    tableBody.querySelectorAll('.view-inq-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.target.getAttribute('data-id');
            openInquiryViewModal(id);
        });
    });
    
    // Delete action listener
    tableBody.querySelectorAll('.delete-inq-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.target.getAttribute('data-id');
            if (confirm("Are you sure you want to permanently delete inquiry " + id + "?")) {
                const database = getDb();
                database.inquiries = database.inquiries.filter(i => i.id !== id);
                saveDb(database);
                renderInquiriesTable();
                renderMetrics();
                renderRecentInquiries();
            }
        });
    });
    
    // CSV Export button trigger
    const exportBtn = document.getElementById('export-csv-btn');
    if (exportBtn) {
        // Remove existing listeners by cloning
        const newBtn = exportBtn.cloneNode(true);
        exportBtn.parentNode.replaceChild(newBtn, exportBtn);
        
        newBtn.addEventListener('click', () => {
            const database = getDb();
            let csv = 'Inquiry ID,Customer Name,Email,Phone,Event Date,Guests,Event Type,Status,Created At\n';
            database.inquiries.forEach(i => {
                csv += `"${i.id}","${i.name}","${i.email}","${i.phone}","${i.date}",${i.guests},"${i.event_type}","${i.status}","${i.created_at}"\n`;
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", `wedding_venue_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}

// Open Inquiry Details view modal
function openInquiryViewModal(id) {
    const db = getDb();
    const inq = db.inquiries.find(i => i.id === id);
    if (!inq) return;
    
    const pkg = db.packages.find(p => p.id === inq.package_id);
    const pkgName = pkg ? pkg.name : 'None Selected';
    
    const container = document.getElementById('modal-body-container');
    container.innerHTML = `
        <ul class="details-list">
            <li><div class="details-label">Inquiry ID</div><div class="details-value">${inq.id}</div></li>
            <li><div class="details-label">Customer Name</div><div class="details-value">${inq.name}</div></li>
            <li><div class="details-label">Email Address</div><div class="details-value">${inq.email}</div></li>
            <li><div class="details-label">Phone Number</div><div class="details-value">${inq.phone}</div></li>
            <li><div class="details-label">Event Date</div><div class="details-value">${inq.date}</div></li>
            <li><div class="details-label">Guest Count</div><div class="details-value">${inq.guests} Guests</div></li>
            <li><div class="details-label">Event Type</div><div class="details-value">${inq.event_type}</div></li>
            <li><div class="details-label">Selected Package</div><div class="details-value">${pkgName}</div></li>
            <li><div class="details-label">Inquiry Status</div><div class="details-value"><span class="badge badge-${inq.status.toLowerCase()}">${inq.status}</span></div></li>
            <li><div class="details-label">Customer Notes</div><div class="details-value">${inq.notes || 'No notes left.'}</div></li>
            <li><div class="details-label">Received Date</div><div class="details-value">${new Date(inq.created_at).toLocaleString()}</div></li>
        </ul>
        <div class="admin-form-group" style="margin-top: 1.5rem;">
            <label for="admin-internal-notes">Staff Notes (Add updates/logs here):</label>
            <textarea id="admin-internal-notes" rows="4">${inq.staff_notes || ''}</textarea>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:1rem; margin-top:1.5rem;">
            <button class="admin-btn admin-btn-secondary close-modal-action">Close</button>
            <button class="admin-btn admin-btn-primary save-staff-notes-btn" data-id="${inq.id}">Save Notes</button>
        </div>
    `;
    
    const modal = document.getElementById('details-modal');
    modal.classList.add('active');
    
    // modal button actions
    container.querySelector('.close-modal-action').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    container.querySelector('.save-staff-notes-btn').addEventListener('click', e => {
        const notes = document.getElementById('admin-internal-notes').value;
        const database = getDb();
        const index = database.inquiries.findIndex(i => i.id === id);
        if (index !== -1) {
            database.inquiries[index].staff_notes = notes;
            saveDb(database);
            alert("Staff notes saved successfully.");
            modal.classList.remove('active');
            renderInquiriesTable();
        }
    });
}

// Render Venue Spaces Management Panel
function renderVenuesPanel() {
    const db = getDb();
    const grid = document.getElementById('venues-spaces-list');
    if (!grid) return;
    
    let html = '';
    db.venues.forEach(v => {
        html += `
        <div class="space-cms-card" data-id="${v.id}">
            <div class="space-cms-img">
                <img src="${v.image}" alt="${v.name}">
            </div>
            <div class="space-cms-body">
                <h3>${v.name}</h3>
                <div class="space-cms-meta">
                    🏷️ Type: ${v.tag} | 👥 Capacity: ${v.capacity}
                </div>
                <div style="font-weight:600; color:var(--admin-primary, var(--admin-primary-fallback)); font-size:0.9rem; margin-bottom:0.5rem;">
                    ${v.price}
                </div>
                <p style="font-size:0.8rem; color:var(--text-admin-muted);">${v.description.substring(0, 100)}...</p>
            </div>
            <div class="space-cms-actions">
                <button class="admin-btn admin-btn-secondary admin-btn-small edit-space-btn" data-id="${v.id}" style="flex-grow:1;">Edit Space</button>
                <button class="admin-btn admin-btn-danger admin-btn-small delete-space-btn" data-id="${v.id}">Delete</button>
            </div>
        </div>`;
    });
    grid.innerHTML = html;
    
    // Register actions
    grid.querySelectorAll('.delete-space-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            if (confirm("Are you sure you want to delete this venue space?")) {
                const database = getDb();
                database.venues = database.venues.filter(v => v.id !== id);
                saveDb(database);
                renderVenuesPanel();
            }
        });
    });
    
    grid.querySelectorAll('.edit-space-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            openEditSpaceModal(id);
        });
    });
}

// Add/Edit Venue Space Modal handler
function openEditSpaceModal(id = null) {
    const db = getDb();
    let space = { name: '', tag: '', image: '', capacity: '', price: '', description: '', features: [] };
    
    if (id !== null) {
        space = db.venues.find(v => v.id === id);
    }
    
    const container = document.getElementById('modal-body-container');
    container.innerHTML = `
        <form id="edit-venue-space-form">
            <div class="admin-form-group">
                <label>Venue Space Name</label>
                <input type="text" name="name" value="${space.name}" required placeholder="e.g. Royal Wedding Garden">
            </div>
            <div class="admin-form-row">
                <div class="admin-form-group">
                    <label>Tag / Category</label>
                    <input type="text" name="tag" value="${space.tag}" required placeholder="e.g. Outdoor Lawn">
                </div>
                <div class="admin-form-group">
                    <label>Guest Capacity</label>
                    <input type="text" name="capacity" value="${space.capacity}" required placeholder="e.g. 1,000 Guests">
                </div>
            </div>
            <div class="admin-form-row">
                <div class="admin-form-group">
                    <label>Price Range / Fee</label>
                    <input type="text" name="price" value="${space.price}" required placeholder="e.g. $5,500 / Day">
                </div>
                <div class="admin-form-group">
                    <label>Visual Image Path</label>
                    <input type="text" name="image" value="${space.image}" required placeholder="e.g. assets/luxury-garden.jpg">
                </div>
            </div>
            <div class="admin-form-group">
                <label>Description</label>
                <textarea name="description" rows="3" required placeholder="Describe the ambiance, setup, and aesthetics...">${space.description}</textarea>
            </div>
            <div class="admin-form-group">
                <label>Key Inclusions / Features (Comma separated)</label>
                <input type="text" name="features" value="${space.features.join(', ')}" placeholder="e.g. Bridal Lounge, Ambient Lighting, Fountains">
            </div>
            <div class="admin-form-actions">
                <button type="button" class="admin-btn admin-btn-secondary close-modal-action">Cancel</button>
                <button type="submit" class="admin-btn admin-btn-primary">Save Space</button>
            </div>
        </form>
    `;
    
    const modal = document.getElementById('details-modal');
    modal.classList.add('active');
    
    container.querySelector('.close-modal-action').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    const form = document.getElementById('edit-venue-space-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const database = getDb();
        
        const updatedSpace = {
            id: id !== null ? id : Math.floor(Math.random() * 10000),
            name: form.name.value,
            tag: form.tag.value,
            image: form.image.value,
            capacity: form.capacity.value,
            price: form.price.value,
            description: form.description.value,
            features: form.features.value.split(',').map(f => f.trim()).filter(f => f.length > 0)
        };
        
        if (id !== null) {
            const index = database.venues.findIndex(v => v.id === id);
            if (index !== -1) database.venues[index] = updatedSpace;
        } else {
            database.venues.push(updatedSpace);
        }
        
        saveDb(database);
        modal.classList.remove('active');
        renderVenuesPanel();
    });
}

// Render Wedding Packages Management Panel
function renderPackagesPanel() {
    const db = getDb();
    const container = document.getElementById('packages-editor-list');
    if (!container) return;
    
    let html = '';
    db.packages.forEach(pkg => {
        html += `
        <div class="panel-card" style="margin-bottom:1.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                <h3 style="font-size:1.1rem; font-weight:600;">${pkg.name} ${pkg.featured ? '<span class="badge badge-confirmed">Featured</span>' : ''}</h3>
                <div>
                    <button class="admin-btn admin-btn-secondary admin-btn-small edit-pkg-btn" data-id="${pkg.id}">Edit</button>
                    <button class="admin-btn admin-btn-danger admin-btn-small delete-pkg-btn" data-id="${pkg.id}">Delete</button>
                </div>
            </div>
            <div style="color:var(--admin-primary, var(--admin-primary-fallback)); font-size:1.3rem; font-family:'Cormorant Garamond', serif; font-weight:bold; margin-bottom:0.5rem;">
                ${pkg.price}
            </div>
            <div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-admin-muted); margin-bottom:1rem;">
                ${pkg.subtitle}
            </div>
            <ul style="list-style:none; font-size:0.85rem; padding-left:1rem; border-left: 2px solid var(--border-color);">
                ${pkg.features.map(f => `<li style="padding:0.25rem 0;">✓ ${f}</li>`).join('')}
            </ul>
        </div>`;
    });
    
    container.innerHTML = html;
    
    // Register actions
    container.querySelectorAll('.delete-pkg-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            if (confirm("Are you sure you want to delete this wedding package?")) {
                const database = getDb();
                database.packages = database.packages.filter(p => p.id !== id);
                saveDb(database);
                renderPackagesPanel();
            }
        });
    });
    
    container.querySelectorAll('.edit-pkg-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            openEditPackageModal(id);
        });
    });
}

// Add/Edit Package Modal handler
function openEditPackageModal(id = null) {
    const db = getDb();
    let pkg = { name: '', price: '', subtitle: '', featured: false, features: [] };
    
    if (id !== null) {
        pkg = db.packages.find(p => p.id === id);
    }
    
    const container = document.getElementById('modal-body-container');
    container.innerHTML = `
        <form id="edit-package-form">
            <div class="admin-form-group">
                <label>Package Title</label>
                <input type="text" name="name" value="${pkg.name}" required placeholder="e.g. Gold Royal Package">
            </div>
            <div class="admin-form-row">
                <div class="admin-form-group">
                    <label>Package Price Tag</label>
                    <input type="text" name="price" value="${pkg.price}" required placeholder="e.g. $7,500">
                </div>
                <div class="admin-form-group">
                    <label>Sub-title</label>
                    <input type="text" name="subtitle" value="${pkg.subtitle}" required placeholder="e.g. Premium Catering Included">
                </div>
            </div>
            <div class="admin-form-group" style="display:flex; align-items:center; gap:0.5rem; margin:1rem 0;">
                <input type="checkbox" name="featured" id="pkg-featured-check" ${pkg.featured ? 'checked' : ''}>
                <label for="pkg-featured-check" style="margin-bottom:0; cursor:pointer;">Highlight as "Most Popular" Package</label>
            </div>
            <div class="admin-form-group">
                <label>Package Inclusions (One feature per line)</label>
                <textarea name="features" rows="5" required placeholder="e.g.&#10;8 Hours Lawn Rental&#10;Catering for 150 Guests&#10;Bridal Suite Room">${pkg.features.join('\n')}</textarea>
            </div>
            <div class="admin-form-actions">
                <button type="button" class="admin-btn admin-btn-secondary close-modal-action">Cancel</button>
                <button type="submit" class="admin-btn admin-btn-primary">Save Package</button>
            </div>
        </form>
    `;
    
    const modal = document.getElementById('details-modal');
    modal.classList.add('active');
    
    container.querySelector('.close-modal-action').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    const form = document.getElementById('edit-package-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const database = getDb();
        
        const updatedPkg = {
            id: id !== null ? id : Math.floor(Math.random() * 10000),
            name: form.name.value,
            price: form.price.value,
            subtitle: form.subtitle.value,
            featured: form.featured.checked,
            features: form.features.value.split('\n').map(f => f.trim()).filter(f => f.length > 0)
        };
        
        // Ensure only one is featured if featured check is enabled
        if (updatedPkg.featured) {
            database.packages.forEach(p => p.featured = false);
        }
        
        if (id !== null) {
            const index = database.packages.findIndex(p => p.id === id);
            if (index !== -1) database.packages[index] = updatedPkg;
        } else {
            database.packages.push(updatedPkg);
        }
        
        saveDb(database);
        modal.classList.remove('active');
        renderPackagesPanel();
    });
}

// Render Rooms Management Panel
function renderRoomsPanel() {
    const db = getDb();
    const grid = document.getElementById('rooms-cms-grid');
    if (!grid) return;
    
    let html = '';
    db.rooms.forEach(r => {
        html += `
        <div class="space-cms-card" data-id="${r.id}">
            <div class="space-cms-img">
                <img src="${r.image}" alt="${r.name}">
            </div>
            <div class="space-cms-body">
                <h3>${r.name}</h3>
                <div class="space-cms-meta">
                    👥 Capacity: ${r.capacity}
                </div>
                <ul style="font-size:0.75rem; color:var(--text-admin-muted); margin-top:0.5rem; padding-left:1rem;">
                    ${r.amenities.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
            <div class="space-cms-actions">
                <button class="admin-btn admin-btn-secondary admin-btn-small edit-room-btn" data-id="${r.id}" style="flex-grow:1;">Edit Room</button>
                <button class="admin-btn admin-btn-danger admin-btn-small delete-room-btn" data-id="${r.id}">Delete</button>
            </div>
        </div>`;
    });
    
    grid.innerHTML = html;
    
    // Register actions
    grid.querySelectorAll('.delete-room-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            if (confirm("Are you sure you want to delete this room category?")) {
                const database = getDb();
                database.rooms = database.rooms.filter(r => r.id !== id);
                saveDb(database);
                renderRoomsPanel();
            }
        });
    });
    
    grid.querySelectorAll('.edit-room-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            openEditRoomModal(id);
        });
    });
}

// Add/Edit Room Modal handler
function openEditRoomModal(id = null) {
    const db = getDb();
    let room = { name: '', image: '', capacity: '', amenities: [] };
    
    if (id !== null) {
        room = db.rooms.find(r => r.id === id);
    }
    
    const container = document.getElementById('modal-body-container');
    container.innerHTML = `
        <form id="edit-room-form">
            <div class="admin-form-group">
                <label>Room Category Name</label>
                <input type="text" name="name" value="${room.name}" required placeholder="e.g. Royal Emperor Suite">
            </div>
            <div class="admin-form-row">
                <div class="admin-form-group">
                    <label>Guest Capacity</label>
                    <input type="text" name="capacity" value="${room.capacity}" required placeholder="e.g. 2 Adults, 1 Child">
                </div>
                <div class="admin-form-group">
                    <label>Visual Image Path</label>
                    <input type="text" name="image" value="${room.image}" required placeholder="e.g. assets/resort-room.jpg">
                </div>
            </div>
            <div class="admin-form-group">
                <label>Amenities (Comma separated)</label>
                <input type="text" name="amenities" value="${room.amenities.join(', ')}" placeholder="e.g. King Bed, Mini Bar, Jacuzzi, Balcony">
            </div>
            <div class="admin-form-actions">
                <button type="button" class="admin-btn admin-btn-secondary close-modal-action">Cancel</button>
                <button type="submit" class="admin-btn admin-btn-primary">Save Room</button>
            </div>
        </form>
    `;
    
    const modal = document.getElementById('details-modal');
    modal.classList.add('active');
    
    container.querySelector('.close-modal-action').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    const form = document.getElementById('edit-room-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const database = getDb();
        
        const updatedRoom = {
            id: id !== null ? id : Math.floor(Math.random() * 10000),
            name: form.name.value,
            image: form.image.value,
            capacity: form.capacity.value,
            amenities: form.amenities.value.split(',').map(a => a.trim()).filter(a => a.length > 0)
        };
        
        if (id !== null) {
            const index = database.rooms.findIndex(r => r.id === id);
            if (index !== -1) database.rooms[index] = updatedRoom;
        } else {
            database.rooms.push(updatedRoom);
        }
        
        saveDb(database);
        modal.classList.remove('active');
        renderRoomsPanel();
    });
}

// Render dynamic content CMS editor
function renderContentPanel() {
    const db = getDb();
    const form = document.getElementById('content-cms-form');
    if (!form) return;
    
    // Bind tokens values to form fields
    form.clinic_name.value = db.tokens.clinic_name;
    form.phone.value = db.tokens.phone;
    form.address.value = db.tokens.address;
    form.logo_url.value = db.tokens.logo_url;
    form.primary_color.value = db.tokens.primary_color;
    
    // Update theme color preview picker
    const colorPreview = document.getElementById('picker-color-preview');
    if (colorPreview) {
        colorPreview.style.backgroundColor = db.tokens.primary_color;
    }
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        const database = getDb();
        
        database.tokens.clinic_name = form.clinic_name.value;
        database.tokens.phone = form.phone.value;
        database.tokens.address = form.address.value;
        database.tokens.logo_url = form.logo_url.value;
        database.tokens.primary_color = form.primary_color.value;
        
        saveDb(database);
        alert("Website tokens and branding updated successfully. Changes will reflect instantly on client site.");
        
        if (colorPreview) {
            colorPreview.style.backgroundColor = database.tokens.primary_color;
        }
    });
    
    // Sync color preview when user types in color box
    form.primary_color.addEventListener('input', e => {
        if (colorPreview) {
            colorPreview.style.backgroundColor = e.target.value;
        }
    });
}

// Render Settings & Backups Control
function renderSettingsPanel() {
    const db = getDb();
    
    // Export Backup JSON
    const backupBtn = document.getElementById('backup-json-btn');
    if (backupBtn) {
        backupBtn.addEventListener('click', () => {
            const database = getDb();
            const json = JSON.stringify(database, null, 4);
            const blob = new Blob([json], { type: 'application/json' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", `wedding_venue_backup_${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // Reset defaults system trigger
    const resetBtn = document.getElementById('reset-system-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm("WARNING: This will erase all inquiries, custom packages, rooms, and restore all tokens to default configurations. Proceed?")) {
                localStorage.removeItem('wedding_venue_cms_data');
                location.reload();
            }
        });
    }
    
    // Secure password change simulation
    const passForm = document.getElementById('admin-password-form');
    if (passForm) {
        passForm.addEventListener('submit', e => {
            e.preventDefault();
            const curr = passForm.current_pass.value;
            const nw = passForm.new_pass.value;
            const conf = passForm.confirm_pass.value;
            
            if (curr !== 'admin') {
                alert("Incorrect current password.");
                return;
            }
            if (nw !== conf) {
                alert("New passwords do not match.");
                return;
            }
            alert("Password updated successfully! (Mock confirmation)");
            passForm.reset();
        });
    }
}

// Setup universal modal listeners
function setupModals() {
    const modal = document.getElementById('details-modal');
    if (!modal) return;
    
    modal.querySelector('.admin-modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Add space buttons
    const addSpaceBtn = document.getElementById('add-new-space-btn');
    if (addSpaceBtn) {
        addSpaceBtn.addEventListener('click', () => {
            openEditSpaceModal();
        });
    }
    
    // Add package buttons
    const addPkgBtn = document.getElementById('add-new-pkg-btn');
    if (addPkgBtn) {
        addPkgBtn.addEventListener('click', () => {
            openEditPackageModal();
        });
    }
    
    // Add room buttons
    const addRoomBtn = document.getElementById('add-new-room-btn');
    if (addRoomBtn) {
        addRoomBtn.addEventListener('click', () => {
            openEditRoomModal();
        });
    }
}

// Run auth check on load
window.addEventListener('DOMContentLoaded', checkAuth);
