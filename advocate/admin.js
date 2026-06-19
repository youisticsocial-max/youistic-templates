/**
 * Chambers Administrator Console Logic
 * Client-side State Database Sync, Auth Guard, and CRUD Operations
 */

// --- 1. SECURE SANITIZATION & HELPERS ---
function sanitizeInput(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => {
        switch (m) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#x27;';
            default: return m;
        }
    });
}

function formatDateTime(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// --- 2. LOCAL DATABASE SETUP ---
const DEFAULT_DATABASE = {
    passphrase: "admin123", // default plain passphrase, changed via settings
    contacts: {
        phone: "+91 96362 03889",
        email: "contact@advtanwarsingh.in",
        address: "Advocate Tanwar Singh Chambers, Court Road, Jodhpur, Rajasthan, 342001",
        mapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.8385202685934!2d73.0188849!3d26.2750057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c38ff24208b%3A0x6339a03b5b15b38f!2sCourt%20Rd%2C%20Jodhpur%2C%20Rajasthan%20342001!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    content: {
        heroTitle: "Service Matter & Administrative Law Advocacy",
        heroSubtitle: "Dedicated legal representation for Central Government, State Government, Defense, and PSU employees at the Jodhpur High Court and Central Administrative Tribunal.",
        aboutText: "The chambers of Advocate Tanwar Singh offer legal counsel, filing, and arguing of service-related disputes. Our practice is built on a deep understanding of administrative procedures, civil services code of conduct, pensions regulations, and constitutional remedies. We ensure that government personnel have access to qualified legal representation when contesting arbitrary department decisions."
    },
    gallery: [
        { id: "g1", src: "img/about.png", caption: "Chamber Library Consultation Area" },
        { id: "g2", src: "img/feature.png", caption: "Advocate Tanwar Singh in Jodhpur Principal Seat" }
    ],
    links: [
        { id: "l1", title: "Bar Council of Rajasthan", url: "https://www.barcouncilofrajasthan.org" },
        { id: "l2", title: "Rajasthan High Court Jodhpur", url: "https://hcraj.nic.in/hcraj/" },
        { id: "l3", title: "Central Administrative Tribunal", url: "https://www.centraladm.gov.in" }
    ],
    intakes: [
        {
            id: "i1",
            name: "Harish Chandra Sen",
            phone: "+91 94140 12345",
            sector: "central",
            category: "suspension",
            brief: "Suspended without charge-sheet for 120 days under Railway Rules. Seeking reinstatement appeal at CAT.",
            date: "2026-06-03T10:15:30.000Z",
            status: "new"
        },
        {
            id: "i2",
            name: "Rajesh Kumar Sharma",
            phone: "+91 98290 54321",
            sector: "state",
            category: "pension",
            brief: "Arbitrary recovery order issued against retired Class III employee. Seeking stay petition from Rajasthan High Court.",
            date: "2026-06-02T14:45:00.000Z",
            status: "in-progress"
        },
        {
            id: "i3",
            name: "Subedar Vikram Singh (Retd.)",
            phone: "+91 96362 11111",
            sector: "defense",
            category: "promotion",
            brief: "Supersession in promotion eligibility. Departmental appeal rejected. Case ready for listing.",
            date: "2026-05-28T09:30:00.000Z",
            status: "resolved"
        }
    ],
    logs: [
        { action: "Database initialized.", time: new Date().toISOString() }
    ]
};

// Initialize Database if not already present
let db = JSON.parse(localStorage.getItem('adv_chambers_db'));
if (!db) {
    db = DEFAULT_DATABASE;
    localStorage.setItem('adv_chambers_db', JSON.stringify(db));
}

function saveDatabase() {
    localStorage.setItem('adv_chambers_db', JSON.stringify(db));
}

function logActivity(actionText) {
    db.logs.unshift({
        action: actionText,
        time: new Date().toISOString()
    });
    // Cap logs at 30 entries
    if (db.logs.length > 30) db.logs.pop();
    saveDatabase();
    renderLogs();
}

// --- 3. TOAST SYSTEM ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-msg">${sanitizeInput(message)}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- 4. AUTHENTICATION ---
const loginOverlay = document.getElementById('login-overlay');
const adminApp = document.getElementById('admin-app');
const loginForm = document.getElementById('login-form');
const authError = document.getElementById('auth-error');

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
    if (isLoggedIn) {
        loginOverlay.classList.add('hidden');
        adminApp.classList.remove('hidden');
        initializeConsole();
    } else {
        loginOverlay.classList.remove('hidden');
        adminApp.classList.add('hidden');
    }
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const passphraseInput = document.getElementById('admin-passphrase').value;
        
        if (passphraseInput === db.passphrase) {
            sessionStorage.setItem('admin_logged_in', 'true');
            authError.style.display = 'none';
            loginOverlay.classList.add('hidden');
            adminApp.classList.remove('hidden');
            document.getElementById('admin-passphrase').value = '';
            showToast("Access Unlocked. Welcome back.", "success");
            initializeConsole();
        } else {
            authError.style.display = 'block';
        }
    });
}

function logout() {
    sessionStorage.removeItem('admin_logged_in');
    checkAuth();
    showToast("Logged out successfully.", "info");
}

document.getElementById('logout-btn-desktop')?.addEventListener('click', logout);
document.getElementById('logout-btn-mobile')?.addEventListener('click', logout);

// --- 5. MOBILE DRAWER SLIDER ---
const mobileDrawerToggle = document.getElementById('mobile-drawer-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileDrawerClose = document.getElementById('mobile-drawer-close');
const drawerLinks = document.querySelectorAll('.drawer-link');

function toggleDrawer(open) {
    if (open) {
        mobileDrawer.classList.add('active');
    } else {
        mobileDrawer.classList.remove('active');
    }
}

mobileDrawerToggle?.addEventListener('click', () => toggleDrawer(true));
mobileDrawerClose?.addEventListener('click', () => toggleDrawer(false));
mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) toggleDrawer(false);
});

drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleDrawer(false);
        const tabName = link.getAttribute('data-tab');
        if (tabName) switchTab(tabName);
    });
});

// --- 6. TAB ROUTING ---
const tabLinks = document.querySelectorAll('.sidebar-link, .bottom-nav-link');
const tabPanels = document.querySelectorAll('.tab-panel');
const pageTitle = document.getElementById('page-title');

function switchTab(tabId) {
    tabLinks.forEach(link => {
        if (link.getAttribute('data-tab') === tabId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    tabPanels.forEach(panel => {
        if (panel.id === `panel-${tabId}`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    // Update Titles
    const pageTitles = {
        dashboard: "Dashboard Overview",
        intakes: "Chamber Intake Portal",
        content: "Dynamic Content Editor",
        links: "Coordinate Links Manager",
        settings: "Console Settings"
    };
    if (pageTitle) {
        pageTitle.textContent = pageTitles[tabId] || "Admin Console";
    }

    // Custom Triggers on tab loads
    if (tabId === 'intakes') {
        loadIntakesData();
    } else if (tabId === 'content') {
        loadCMSContent();
    } else if (tabId === 'links') {
        renderLinksList();
    }
}

tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const tabId = link.getAttribute('data-tab');
        if (tabId) {
            e.preventDefault();
            switchTab(tabId);
        }
    });
});

// Quick action links on dashboard
document.getElementById('btn-quick-intake')?.addEventListener('click', () => switchTab('intakes'));
document.getElementById('btn-quick-gallery')?.addEventListener('click', () => {
    switchTab('content');
    // switch subtab
    switchSubTab('gallery-subtab');
});

// CMS Content Sub-Tabs
const subNavBtns = document.querySelectorAll('.sub-nav-btn');
const subtabPanels = document.querySelectorAll('.subtab-panel');

function switchSubTab(subtabId) {
    subNavBtns.forEach(btn => {
        if (btn.getAttribute('data-subtab') === subtabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    subtabPanels.forEach(panel => {
        if (panel.id === subtabId) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

subNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const subtabId = btn.getAttribute('data-subtab');
        if (subtabId) switchSubTab(subtabId);
    });
});


// --- 7. DASHBOARD LOGS AND STATS ---
function updateStatsCounters() {
    const total = db.intakes.length;
    const pending = db.intakes.filter(i => i.status === 'new' || !i.status).length;
    const resolved = db.intakes.filter(i => i.status === 'resolved').length;

    // Set badges
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-pending').textContent = pending;
    document.getElementById('stat-resolved').textContent = resolved;

    // Badges in sidebar/bottomnav
    const badgeSidebar = document.getElementById('intake-badge-count');
    const badgeMobile = document.getElementById('intake-badge-count-mobile');

    if (badgeSidebar) {
        badgeSidebar.textContent = pending;
        badgeSidebar.style.display = pending > 0 ? 'inline-block' : 'none';
    }
    if (badgeMobile) {
        badgeMobile.textContent = pending;
        badgeMobile.style.display = pending > 0 ? 'inline-block' : 'none';
    }
}

function renderLogs() {
    const logContainer = document.getElementById('activity-log');
    if (!logContainer) return;

    if (db.logs.length === 0) {
        logContainer.innerHTML = `<li class="log-item empty">No recent actions logged.</li>`;
        return;
    }

    logContainer.innerHTML = db.logs.map(log => `
        <li class="log-item">
            <span class="log-text">${sanitizeInput(log.action)}</span>
            <span class="log-time">${formatDateTime(log.time)}</span>
        </li>
    `).join('');
}


// --- 8. CHAMBER INTAKE PORTAL CRUD ---
let selectedIntakeId = null;

function loadIntakesData() {
    const skeleton = document.getElementById('intakes-skeleton');
    const table = document.getElementById('intakes-table');
    const emptyState = document.getElementById('intakes-empty-state');
    
    if (skeleton && table) {
        skeleton.classList.remove('hidden');
        table.classList.add('hidden');
        emptyState.classList.add('hidden');

        // Simulate async delay
        setTimeout(() => {
            skeleton.classList.add('hidden');
            renderIntakesList();
        }, 500);
    }
}

function renderIntakesList() {
    const tbody = document.getElementById('intakes-tbody');
    const table = document.getElementById('intakes-table');
    const emptyState = document.getElementById('intakes-empty-state');
    const searchVal = document.getElementById('intake-search').value.toLowerCase();
    const filterStatus = document.getElementById('intake-filter-status').value;

    if (!tbody) return;

    // Filter logic
    let filtered = db.intakes.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchVal) || 
                              item.phone.includes(searchVal);
        
        let matchesStatus = true;
        if (filterStatus !== 'all') {
            matchesStatus = item.status === filterStatus;
        }

        return matchesSearch && matchesStatus;
    });

    // Sort by newest first
    filtered.sort((a,b) => new Date(b.date) - new Date(a.date));

    if (filtered.length === 0) {
        tbody.innerHTML = '';
        table.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    table.classList.remove('hidden');

    const sectorNames = {
        central: "Central Govt",
        state: "Rajasthan State",
        defense: "Defense Staff",
        psu: "Public Sector (PSU)"
    };

    const categoryNames = {
        suspension: "Suspension & Inquiry",
        promotion: "Promotion & Seniority",
        pension: "Pension & Gratuity",
        termination: "Wrongful Termination"
    };

    tbody.innerHTML = filtered.map(item => {
        let statusClass = 'new';
        let statusLabel = 'New';
        if (item.status === 'in-progress') {
            statusClass = 'in-progress';
            statusLabel = 'In Progress';
        } else if (item.status === 'resolved') {
            statusClass = 'resolved';
            statusLabel = 'Resolved';
        }

        return `
            <tr data-id="${item.id}">
                <td data-label="Date Submitted">${formatDateTime(item.date)}</td>
                <td data-label="Employee Name"><strong>${sanitizeInput(item.name)}</strong></td>
                <td data-label="Contact Number">${sanitizeInput(item.phone)}</td>
                <td data-label="Sector">${sectorNames[item.sector] || item.sector}</td>
                <td data-label="Category">${categoryNames[item.category] || item.category}</td>
                <td data-label="Status">
                    <span class="status-pill ${statusClass}">${statusLabel}</span>
                </td>
                <td data-label="Actions">
                    <button class="btn btn-sm btn-outline-gold btn-view-details">Open Details</button>
                </td>
            </tr>
        `;
    }).join('');

    // Attach Click Events to rows and buttons
    const trs = tbody.querySelectorAll('tr');
    trs.forEach(tr => {
        const id = tr.getAttribute('data-id');
        const viewBtn = tr.querySelector('.btn-view-details');
        
        const openDetail = () => openIntakeDetails(id);
        
        tr.addEventListener('click', (e) => {
            // avoid opening if clicking table actions explicitly (unless button clicked)
            if (e.target.tagName !== 'BUTTON') {
                openDetail();
            }
        });
        viewBtn?.addEventListener('click', openDetail);
    });
}

// Intake filtering event listeners
document.getElementById('intake-search')?.addEventListener('input', renderIntakesList);
document.getElementById('intake-filter-status')?.addEventListener('change', renderIntakesList);

// Details Modal handlers
const detailModal = document.getElementById('intake-detail-modal');
const closeDetailModalBtn = document.getElementById('btn-close-intake-modal');
const closeDetailModalFoot = document.getElementById('btn-modal-close-foot');
const deleteIntakeBtn = document.getElementById('btn-modal-delete');
const modalStatusSelect = document.getElementById('modal-intake-status');

function openIntakeDetails(id) {
    const item = db.intakes.find(i => i.id === id);
    if (!item) return;

    selectedIntakeId = id;
    
    document.getElementById('modal-intake-name').textContent = item.name;
    document.getElementById('modal-intake-date').textContent = formatDateTime(item.date);
    document.getElementById('modal-intake-phone').textContent = item.phone;
    document.getElementById('modal-intake-phone').href = `tel:${item.phone}`;
    
    const sectors = {
        central: "Central Government Department (Railways, Posts, Revenue, etc.)",
        state: "Rajasthan State Government Department (State Police, Education, RAS)",
        defense: "Defense Personnel (Civilian/Combat Cadre)",
        psu: "Public Sector Undertaking (PSU / PSU Bank Employees)"
    };
    const categories = {
        suspension: "Suspension & Departmental Inquiry",
        promotion: "Promotion, Seniority, or Scale Fixation",
        pension: "Pension, Gratuity, or Retiral Recovery",
        termination: "Termination or Compulsory Retirement"
    };

    document.getElementById('modal-intake-sector').textContent = sectors[item.sector] || item.sector;
    document.getElementById('modal-intake-category').textContent = categories[item.category] || item.category;
    document.getElementById('modal-intake-brief').textContent = item.brief;

    modalStatusSelect.value = item.status || 'new';

    detailModal.classList.remove('hidden');
}

function closeIntakeModal() {
    detailModal.classList.add('hidden');
    selectedIntakeId = null;
}

closeDetailModalBtn?.addEventListener('click', closeIntakeModal);
closeDetailModalFoot?.addEventListener('click', closeIntakeModal);
detailModal?.addEventListener('click', (e) => {
    if (e.target === detailModal) closeIntakeModal();
});

modalStatusSelect?.addEventListener('change', (e) => {
    if (!selectedIntakeId) return;
    const newStatus = e.target.value;
    const item = db.intakes.find(i => i.id === selectedIntakeId);
    if (item) {
        const oldStatus = item.status;
        item.status = newStatus;
        saveDatabase();
        updateStatsCounters();
        renderIntakesList();
        logActivity(`Changed status of intake for '${item.name}' from '${oldStatus}' to '${newStatus}'.`);
        showToast("Status updated successfully.");
    }
});

deleteIntakeBtn?.addEventListener('click', () => {
    if (!selectedIntakeId) return;
    const item = db.intakes.find(i => i.id === selectedIntakeId);
    if (!item) return;

    if (confirm(`Are you sure you want to permanently delete the intake request from ${item.name}?`)) {
        db.intakes = db.intakes.filter(i => i.id !== selectedIntakeId);
        saveDatabase();
        updateStatsCounters();
        renderIntakesList();
        logActivity(`Deleted intake record from '${item.name}'.`);
        showToast("Intake record deleted.", "error");
        closeIntakeModal();
    }
});

// CSV Export Utility
document.getElementById('btn-export-csv')?.addEventListener('click', () => {
    if (db.intakes.length === 0) {
        showToast("No intake records to export.", "error");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date Submitted,Employee Name,Phone Number,Service Sector,Category,Description,Status\n";

    db.intakes.forEach(item => {
        // Escape quotes
        const name = `"${item.name.replace(/"/g, '""')}"`;
        const phone = `"${item.phone.replace(/"/g, '""')}"`;
        const sector = `"${item.sector.replace(/"/g, '""')}"`;
        const category = `"${item.category.replace(/"/g, '""')}"`;
        const brief = `"${item.brief.replace(/"/g, '""')}"`;
        const status = `"${item.status.replace(/"/g, '""')}"`;
        const date = `"${formatDateTime(item.date).replace(/"/g, '""')}"`;

        csvContent += `${date},${name},${phone},${sector},${category},${brief},${status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chambers_intakes_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);

    logActivity("Exported all intake submissions to CSV.");
    showToast("CSV Export downloaded.");
});


// --- 9. CONTACT DETAILS FORM ---
const formContactDetails = document.getElementById('form-contact-details');

function loadCMSContactForm() {
    if (!formContactDetails) return;
    document.getElementById('cms-phone').value = db.contacts.phone || '';
    document.getElementById('cms-email').value = db.contacts.email || '';
    document.getElementById('cms-address').value = db.contacts.address || '';
    document.getElementById('cms-maps-link').value = db.contacts.mapsLink || '';
}

formContactDetails?.addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = document.getElementById('cms-phone').value.trim();
    const email = document.getElementById('cms-email').value.trim();
    const address = document.getElementById('cms-address').value.trim();
    const mapsLink = document.getElementById('cms-maps-link').value.trim();

    // Client-side validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("Invalid email address format.", "error");
        return;
    }

    const phoneRegex = /^[+\d\s-]{8,20}$/;
    if (!phoneRegex.test(phone)) {
        showToast("Invalid contact phone format.", "error");
        return;
    }

    db.contacts = { phone, email, address, mapsLink };
    saveDatabase();
    logActivity("Updated chamber contact coordinates details.");
    showToast("Contact details saved.");
});


// --- 10. CMS TEXT CONTENT FORM ---
const formTextCMS = document.getElementById('form-text-cms');
const cmsAboutText = document.getElementById('cms-about-text');

function loadCMSContent() {
    if (!formTextCMS) return;
    document.getElementById('cms-hero-title').value = db.content.heroTitle || '';
    document.getElementById('cms-hero-subtitle').value = db.content.heroSubtitle || '';
    cmsAboutText.value = db.content.aboutText || '';

    // Load Gallery Grid inside tab
    renderAdminGallery();
}

formTextCMS?.addEventListener('submit', (e) => {
    e.preventDefault();

    const heroTitle = document.getElementById('cms-hero-title').value.trim();
    const heroSubtitle = document.getElementById('cms-hero-subtitle').value.trim();
    const aboutText = cmsAboutText.value.trim();

    db.content = { heroTitle, heroSubtitle, aboutText };
    saveDatabase();
    logActivity("Published banner and chamber profiles changes to homepage.");
    showToast("Content successfully published.");
});

// Rich Text simulated helpers
document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-tag');
        const start = cmsAboutText.selectionStart;
        const end = cmsAboutText.selectionEnd;
        const text = cmsAboutText.value;
        const selected = text.substring(start, end);

        let replacement = '';
        if (tag === 'b') {
            replacement = `<b>${selected}</b>`;
        } else if (tag === 'i') {
            replacement = `<i>${selected}</i>`;
        } else if (tag === 'point') {
            replacement = `\n<div class="about-point">\n    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="point-icon"><polyline points="20 6 9 17 4 12"/></svg>\n    <span>${selected || 'Point Text'}</span>\n</div>\n`;
        }

        cmsAboutText.value = text.substring(0, start) + replacement + text.substring(end);
        cmsAboutText.focus();
        cmsAboutText.setSelectionRange(start + replacement.length, start + replacement.length);
    });
});


// --- 11. PHOTO GALLERY HANDLER ---
const dropZone = document.getElementById('gallery-drop-zone');
const fileInput = document.getElementById('gallery-file-input');
const metaForm = document.getElementById('gallery-meta-form');
const uploadPreview = document.getElementById('upload-preview');
const uploadCaption = document.getElementById('upload-caption');
const btnSaveUpload = document.getElementById('btn-save-upload');
const btnCancelUpload = document.getElementById('btn-cancel-upload');

let pendingImageBase64 = null;

// Trigger input click
dropZone?.addEventListener('click', () => fileInput.click());

// Drag-n-Drop utilities
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone?.addEventListener(eventName, (e) => e.preventDefault(), false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropZone?.addEventListener(eventName, () => dropZone.classList.add('active'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone?.addEventListener(eventName, () => dropZone.classList.remove('active'), false);
});

dropZone?.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
        handleSelectedImage(files[0]);
    }
});

fileInput?.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleSelectedImage(e.target.files[0]);
    }
});

function handleSelectedImage(file) {
    if (!file.type.startsWith('image/')) {
        showToast("Please drop or select a valid image file.", "error");
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        pendingImageBase64 = event.target.result;
        uploadPreview.src = pendingImageBase64;
        metaForm.classList.remove('hidden');
        dropZone.classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

btnCancelUpload?.addEventListener('click', resetUploader);

function resetUploader() {
    pendingImageBase64 = null;
    uploadPreview.src = '';
    uploadCaption.value = '';
    metaForm.classList.add('hidden');
    dropZone.classList.remove('hidden');
    if (fileInput) fileInput.value = '';
}

btnSaveUpload?.addEventListener('click', () => {
    if (!pendingImageBase64) return;

    const caption = uploadCaption.value.trim() || "Chambers Gallery Photo";
    const newPhoto = {
        id: 'g_' + Date.now(),
        src: pendingImageBase64,
        caption: caption
    };

    db.gallery.push(newPhoto);
    saveDatabase();
    logActivity(`Added a new gallery photo: "${caption}"`);
    showToast("Photo uploaded successfully.");
    resetUploader();
    renderAdminGallery();
});

function renderAdminGallery() {
    const grid = document.getElementById('admin-gallery-grid');
    if (!grid) return;

    if (db.gallery.length === 0) {
        grid.innerHTML = `<div class="span-2 text-center" style="grid-column: 1 / -1; padding: 2rem; color: rgba(30,34,41,0.4)">Gallery is currently empty.</div>`;
        return;
    }

    grid.innerHTML = db.gallery.map(item => `
        <div class="gallery-item-card" data-id="${item.id}">
            <button class="gallery-delete-btn" title="Delete Photo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
            <div class="gallery-image-box">
                <img src="${item.src}" alt="${sanitizeInput(item.caption)}">
            </div>
            <div class="gallery-caption-box">
                <p>${sanitizeInput(item.caption)}</p>
            </div>
        </div>
    `).join('');

    // Attach delete handlers
    grid.querySelectorAll('.gallery-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.gallery-item-card');
            const id = card.getAttribute('data-id');
            const item = db.gallery.find(g => g.id === id);
            
            if (confirm(`Remove this gallery photo ("${item?.caption || 'Photo'}")?`)) {
                db.gallery = db.gallery.filter(g => g.id !== id);
                saveDatabase();
                logActivity(`Deleted gallery photo: "${item?.caption}"`);
                showToast("Photo deleted from gallery.", "error");
                renderAdminGallery();
            }
        });
    });
}


// --- 12. LINKS MANAGER CRUD ---
const formLinks = document.getElementById('form-links-manager');
const linkEditId = document.getElementById('link-edit-id');
const btnCancelLinkEdit = document.getElementById('btn-cancel-link-edit');
const linkFormTitle = document.getElementById('link-form-title');
const btnSaveLink = document.getElementById('btn-save-link');

function renderLinksList() {
    const list = document.getElementById('links-list-container');
    const emptyState = document.getElementById('links-empty-state');
    
    if (!list) return;

    if (db.links.length === 0) {
        list.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    list.innerHTML = db.links.map(link => `
        <li class="link-item" data-id="${link.id}">
            <div class="link-meta">
                <span>${sanitizeInput(link.title)}</span>
                <a href="${link.url}" target="_blank" rel="noopener noreferrer">${sanitizeInput(link.url)}</a>
            </div>
            <div class="link-actions">
                <button class="link-btn edit" title="Edit Link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
                <button class="link-btn delete" title="Delete Link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>
        </li>
    `).join('');

    // Attach edit and delete handlers
    list.querySelectorAll('.link-btn.edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.closest('.link-item').getAttribute('data-id');
            startEditLink(id);
        });
    });

    list.querySelectorAll('.link-btn.delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.closest('.link-item').getAttribute('data-id');
            deleteLink(id);
        });
    });
}

formLinks?.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('link-title').value.trim();
    const url = document.getElementById('link-url').value.trim();
    const editId = linkEditId.value;

    if (editId) {
        // Edit Mode
        const link = db.links.find(l => l.id === editId);
        if (link) {
            const oldTitle = link.title;
            link.title = title;
            link.url = url;
            saveDatabase();
            logActivity(`Edited coordinate link from "${oldTitle}" to "${title}".`);
            showToast("Resource link updated.");
        }
        cancelEditLink();
    } else {
        // Add Mode
        const newLink = {
            id: 'l_' + Date.now(),
            title: title,
            url: url
        };
        db.links.push(newLink);
        saveDatabase();
        logActivity(`Added new coordinate resource link: "${title}".`);
        showToast("New link created.");
        
        document.getElementById('link-title').value = '';
        document.getElementById('link-url').value = '';
    }

    renderLinksList();
});

function startEditLink(id) {
    const link = db.links.find(l => l.id === id);
    if (!link) return;

    linkEditId.value = link.id;
    document.getElementById('link-title').value = link.title;
    document.getElementById('link-url').value = link.url;

    linkFormTitle.textContent = "Edit Coordinate Link";
    btnSaveLink.querySelector('span').textContent = "Save Changes";
    btnCancelLinkEdit.classList.remove('hidden');
}

function cancelEditLink() {
    linkEditId.value = '';
    document.getElementById('link-title').value = '';
    document.getElementById('link-url').value = '';

    linkFormTitle.textContent = "Add Custom Coordinate Link";
    btnSaveLink.querySelector('span').textContent = "Add Resource Link";
    btnCancelLinkEdit.classList.add('hidden');
}

btnCancelLinkEdit?.addEventListener('click', cancelEditLink);

function deleteLink(id) {
    const link = db.links.find(l => l.id === id);
    if (!link) return;

    if (confirm(`Remove this coordinate resource link ("${link.title}")?`)) {
        db.links = db.links.filter(l => l.id !== id);
        saveDatabase();
        logActivity(`Deleted coordinate resource link: "${link.title}"`);
        showToast("Link deleted from resources.", "error");
        renderLinksList();
        
        // If editing this deleted link, cancel edit
        if (linkEditId.value === id) {
            cancelEditLink();
        }
    }
}


// --- 13. SECURITY SETTINGS ---
const formSecuritySettings = document.getElementById('form-security-settings');

formSecuritySettings?.addEventListener('submit', (e) => {
    e.preventDefault();

    const curPhrase = document.getElementById('current-passphrase').value;
    const newPhrase = document.getElementById('new-passphrase').value;
    const confPhrase = document.getElementById('confirm-passphrase').value;

    if (curPhrase !== db.passphrase) {
        showToast("Current passphrase is incorrect.", "error");
        return;
    }

    if (newPhrase.length < 6) {
        showToast("New passphrase must be at least 6 characters.", "error");
        return;
    }

    if (newPhrase !== confPhrase) {
        showToast("Confirm passphrase does not match.", "error");
        return;
    }

    db.passphrase = newPhrase;
    saveDatabase();
    logActivity("Admin access passphrase was updated.");
    showToast("Passphrase successfully changed.");
    formSecuritySettings.reset();
});


// --- 14. INITIALIZATION ROUTINE ---
function initializeConsole() {
    updateStatsCounters();
    renderLogs();
    loadCMSContactForm();
}

// Check initial load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});
