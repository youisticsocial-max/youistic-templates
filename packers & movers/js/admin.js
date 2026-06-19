// Default State in case localStorage is empty
const DEFAULT_STATE = {
    services: [
        {
            id: 'household-shifting',
            title: 'Household Shifting',
            desc: 'Safe packing and relocation of household items. Specialized handling of fragile goods, electronics, and heavy furniture with premium packing material.',
            image: 'assets/house-shifting.jpg',
            icon: 'fa-home',
            category: 'relocation'
        },
        {
            id: 'office-relocation',
            title: 'Office Relocation',
            desc: 'Professional business and commercial moving. Minimize downtime with planned corporate moves, IT infrastructure transit, and file records packing.',
            image: 'assets/office-moving.jpg',
            icon: 'fa-building',
            category: 'relocation'
        },
        {
            id: 'vehicle-transport',
            title: 'Vehicle Transportation',
            desc: 'Secure bike and car transportation. Custom-built container carriers, scratch-free loading systems, and door-to-door safe delivery.',
            image: 'assets/transport-fleet.jpg',
            icon: 'fa-car',
            category: 'transport'
        },
        {
            id: 'goods-transport',
            title: 'Goods Transportation',
            desc: 'Reliable transport solutions for businesses. Part loads (LTL), full truckloads (FTL), and custom business logistics mapping.',
            image: 'assets/cargo-delivery.jpg',
            icon: 'fa-truck-moving',
            category: 'transport'
        },
        {
            id: 'packing-services',
            title: 'Packing Services',
            desc: 'Premium quality packing materials and trained staff. Multi-layer bubble wrap, moisture-resistant boxes, corrugated sheets, and wood crating.',
            image: 'assets/packing-material.jpg',
            icon: 'fa-box-open',
            category: 'logistics'
        },
        {
            id: 'warehouse-storage',
            title: 'Warehouse & Storage',
            desc: 'Secure storage solutions for short and long duration. 24/7 CCTV surveillance, fire protection, dust-free chambers, and inventory logs.',
            image: 'assets/warehouse.jpg',
            icon: 'fa-warehouse',
            category: 'logistics'
        },
        {
            id: 'industrial-logistics',
            title: 'Industrial Logistics',
            desc: 'Heavy equipment and machinery transportation. Hydraulic axles, low-bed trailers, safety inspectors, and custom site-to-site engineering.',
            image: 'assets/logistics-center.jpg',
            icon: 'fa-dolly',
            category: 'logistics'
        }
    ],
    fleet: [
        { id: 1, name: 'Light Cargo Van', type: 'Mini Truck', capacity: '1.5 Tons', use: 'Local household shifting, express box delivery', image: 'assets/loading-team.jpg' },
        { id: 2, name: 'Standard Container Truck', type: 'Container Vehicle', capacity: '7.5 Tons', use: 'Interstate household relocation, corporate shifting', image: 'assets/hero-truck.jpg' },
        { id: 3, name: 'Heavy Duty Trailer', type: 'Specialized Carrier', capacity: '20+ Tons', use: 'Industrial logistics, raw material transit, machinery', image: 'assets/transport-fleet.jpg' },
        { id: 4, name: 'Open Goods Carrier', type: 'Truck Fleet', capacity: '10 Tons', use: 'Commercial cargo, bulk packaging transit, metal loads', image: 'assets/cargo-delivery.jpg' }
    ],
    testimonials: [
        { id: 1, name: 'Arjun Sharma', location: 'Mumbai', service: 'Household Shifting', rating: 5, text: 'Absolutely flawless shifting experience. The packing team wrapped our glass dining table and electronics with triple-layer protection. Reached the destination without a single scratch!', avatar: 'assets/truck-driver.jpg' },
        { id: 2, name: 'Priya Patel', location: 'Bengaluru', service: 'Office Relocation', rating: 5, text: 'Relocating our 30-person office seemed like a nightmare, but {{CLINIC_NAME}} completed it over the weekend. Our servers and workstations were set up and operational by Monday morning.', avatar: 'assets/truck-driver.jpg' },
        { id: 3, name: 'Vikram Singh', location: 'Delhi NCR', service: 'Vehicle Transportation', rating: 4, text: 'Transported my SUV from Delhi to Chennai. Excellent GPS updates throughout the trip, and the delivery driver was very professional. Highly recommended for vehicle transit.', avatar: 'assets/truck-driver.jpg' }
    ],
    faqs: [
        { id: 1, question: 'How do you calculate moving charges?', answer: 'Moving charges are calculated based on the volume/weight of goods, distance between origin and destination, quality of packing materials required, labor involved (including floors and lift availability), and seasonal demand.' },
        { id: 2, question: 'Is insurance available for the transit?', answer: 'Yes, we provide comprehensive transit insurance assistance. It covers any unforeseen accidental damage during loading, transit, or unloading. We highly recommend opting for it to secure your valuables.' },
        { id: 3, question: 'How long does transportation take?', answer: 'Local moves are completed within the same day. For interstate shipping, transit times vary from 2 to 7 days depending on the distance, route clearance, and chosen carrier type.' },
        { id: 4, question: 'What items cannot be transported?', answer: 'For safety reasons, we do not transport hazardous materials, inflammable liquids (petrol, diesel, gas cylinders), explosives, perishable food items, jewelry, currency, high-value assets, and contraband.' },
        { id: 5, question: 'Do you provide packing materials?', answer: 'Yes, we provide all required packing materials including bubble wrap, heavy-duty cartons, stretch films, corrugated boxes, thermocol sheets, and adhesive tapes. Our packing team handles the complete sealing process.' }
    ],
    inquiries: [
        { id: 'REQ-170001', name: 'Rohan Deshmukh', phone: '9876543210', movingFrom: 'Mumbai', movingTo: 'Pune', serviceType: 'Household Shifting', movingDate: '2026-06-25', message: 'Need relocation of 2 BHK flat.', trackingId: 'TRK-528401', status: 'New', date: '2026-06-18' },
        { id: 'REQ-170002', name: 'Megha Goel', phone: '9123456789', movingFrom: 'Kolkata', movingTo: 'Bengaluru', serviceType: 'Vehicle Transit', movingDate: '2026-06-30', message: 'Want to transport Maruti Swift car.', trackingId: 'TRK-741982', status: 'Contacted', date: '2026-06-17' },
        { id: 'REQ-170003', name: 'Acme Tech Solutions', phone: '9988776655', movingFrom: 'Noida', movingTo: 'Gurugram', serviceType: 'Office Shifting', movingDate: '2026-07-05', message: 'Office move with 20 monitors, tables.', trackingId: 'TRK-294015', status: 'Confirmed', date: '2026-06-16' }
    ],
    settings: {
        homepage_headline: 'Moving Your World With Safety & Trust',
        homepage_subheading: 'Professional relocation, transportation, and logistics solutions with secure handling and timely delivery.'
    },
    logs: [
        { time: '2026-06-18 15:30:12', user: 'admin', event: 'Admin Login successful' },
        { time: '2026-06-18 10:12:44', user: 'system', event: 'Daily database backup generated' },
        { time: '2026-06-17 18:45:21', user: 'admin', event: 'Updated settings configuration' }
    ]
};

class AdminCMS {
    constructor() {
        this.state = null;
        window.addEventListener('load', () => {
            // Fallback for {{PRIMARY_COLOR}} token if not yet replaced in development
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
            if (!primaryColor || primaryColor.includes('{')) {
                document.documentElement.style.setProperty('--primary-color', '#0f52ba');
            }
            
            // Replace any uncompiled template tokens in the document with high-quality fallback content
            const replaceDevelopmentTokens = () => {
                if (document.title.includes('{{CLINIC_NAME}}')) {
                    document.title = document.title.replace(/{{CLINIC_NAME}}/g, 'APEX LOGISTICS');
                }
                const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
                let node;
                while (node = walk.nextNode()) {
                    if (node.nodeValue.includes('{{CLINIC_NAME}}')) {
                        node.nodeValue = node.nodeValue.replace(/{{CLINIC_NAME}}/g, 'APEX LOGISTICS');
                    }
                    if (node.nodeValue.includes('{{PHONE}}')) {
                        node.nodeValue = node.nodeValue.replace(/{{PHONE}}/g, '+1 (800) 555-0199');
                    }
                    if (node.nodeValue.includes('{{ADDRESS}}')) {
                        node.nodeValue = node.nodeValue.replace(/{{ADDRESS}}/g, 'Suite 500, Logistics Plaza, Chicago, IL');
                    }
                }
            };
            replaceDevelopmentTokens();
            
            this.init();
        });
    }

    init() {
        // Hydrate State
        if (!localStorage.getItem('packers_movers_state')) {
            localStorage.setItem('packers_movers_state', JSON.stringify(DEFAULT_STATE));
        }
        this.state = JSON.parse(localStorage.getItem('packers_movers_state'));
        
        // Ensure inquiries has default items if empty
        if (this.state.inquiries.length === 0) {
            this.state.inquiries = DEFAULT_STATE.inquiries;
            this.saveState();
        }

        this.initSidebarRouter();
        this.calculateStats();
        this.renderInquiriesTable();
        this.renderServicesList();
        this.renderFleetList();
        this.renderSettings();
        this.renderLogs();
        this.initFormListeners();
    }

    saveState() {
        localStorage.setItem('packers_movers_state', JSON.stringify(this.state));
        this.calculateStats();
    }

    initSidebarRouter() {
        const menuItems = document.querySelectorAll('.sidebar-menu-item');
        const sections = document.querySelectorAll('.cms-section');

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                const targetSection = item.getAttribute('data-target');
                sections.forEach(sec => {
                    sec.classList.remove('active');
                    if (sec.id === targetSection) {
                        sec.classList.add('active');
                    }
                });
            });
        });
    }

    calculateStats() {
        const totalQuotes = this.state.inquiries.length;
        const pendingQuotes = this.state.inquiries.filter(q => q.status === 'New' || q.status === 'Contacted').length;
        const activeVehicles = this.state.fleet.length;
        const totalServices = this.state.services.length;

        document.getElementById('stat-total-quotes').textContent = totalQuotes;
        document.getElementById('stat-pending-quotes').textContent = pendingQuotes;
        document.getElementById('stat-active-fleet').textContent = activeVehicles;
        document.getElementById('stat-total-services').textContent = totalServices;
    }

    // Inquiry CRM Table
    renderInquiriesTable() {
        const tbody = document.getElementById('inquiries-tbody');
        if (!tbody) return;

        if (this.state.inquiries.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">No inquiries found.</td></tr>`;
            return;
        }

        tbody.innerHTML = this.state.inquiries.map(inq => `
            <tr>
                <td><strong>${inq.id}</strong></td>
                <td>
                    <div style="font-weight:600;">${inq.name}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);"><i class="fas fa-phone-alt"></i> ${inq.phone}</div>
                </td>
                <td>
                    <div>${inq.movingFrom} &rarr; ${inq.movingTo}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);">${inq.serviceType}</div>
                </td>
                <td>
                    <div>${inq.date}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);">Moving: ${inq.movingDate}</div>
                </td>
                <td>
                    <select class="form-control" style="padding:0.25rem 0.5rem; font-size:0.85rem;" onchange="adminCMS.updateInquiryStatus('${inq.id}', this.value)">
                        <option value="New" ${inq.status === 'New' ? 'selected' : ''}>New</option>
                        <option value="Contacted" ${inq.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                        <option value="Quote Sent" ${inq.status === 'Quote Sent' ? 'selected' : ''}>Quote Sent</option>
                        <option value="Confirmed" ${inq.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Completed" ${inq.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </td>
                <td>
                    <div style="display:flex; gap:0.5rem;">
                        <button class="btn-action-icon" onclick="adminCMS.viewInquiryDetails('${inq.id}')" title="View Details"><i class="fas fa-eye"></i></button>
                        <button class="btn-action-icon btn-action-delete" onclick="adminCMS.deleteInquiry('${inq.id}')" title="Delete Inquiry"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    updateInquiryStatus(id, newStatus) {
        const inq = this.state.inquiries.find(q => q.id === id);
        if (inq) {
            inq.status = newStatus;
            this.logActivity(`Changed status of quote ${id} to ${newStatus}`);
            this.saveState();
        }
    }

    deleteInquiry(id) {
        if (confirm(`Are you sure you want to delete quote request ${id}?`)) {
            this.state.inquiries = this.state.inquiries.filter(q => q.id !== id);
            this.logActivity(`Deleted quote request ${id}`);
            this.saveState();
            this.renderInquiriesTable();
        }
    }

    viewInquiryDetails(id) {
        const inq = this.state.inquiries.find(q => q.id === id);
        if (!inq) return;

        alert(`
--- QUOTE REQUEST DETAIL ---
Request ID: ${inq.id}
Tracking ID: ${inq.trackingId}
Customer: ${inq.name}
Phone: ${inq.phone}
Route: ${inq.movingFrom} to ${inq.movingTo}
Service Required: ${inq.serviceType}
Date Created: ${inq.date}
Moving Target Date: ${inq.movingDate}
Status: ${inq.status}

User Message: 
"${inq.message || 'No additional remarks.'}"
        `);
    }

    exportInquiriesCSV() {
        if (this.state.inquiries.length === 0) {
            alert('No data to export.');
            return;
        }

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'RequestID,TrackingID,Name,Phone,From,To,Service,MovingDate,Status,DateCreated\n';

        this.state.inquiries.forEach(inq => {
            const row = [
                inq.id,
                inq.trackingId,
                `"${inq.name}"`,
                inq.phone,
                `"${inq.movingFrom}"`,
                `"${inq.movingTo}"`,
                `"${inq.serviceType}"`,
                inq.movingDate,
                inq.status,
                inq.date
            ].join(',');
            csvContent += row + '\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Quote_Requests_Export_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.logActivity('Exported Quote inquiries to CSV');
    }

    // Service CMS Page
    renderServicesList() {
        const list = document.getElementById('services-list-tbody');
        if (!list) return;

        list.innerHTML = this.state.services.map(ser => `
            <tr>
                <td><i class="fas ${ser.icon}" style="font-size:20px; color:var(--primary-color);"></i></td>
                <td><strong>${ser.title}</strong></td>
                <td><span class="status-badge status-new">${ser.category}</span></td>
                <td><p style="max-width:350px; font-size:0.85rem; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${ser.desc}</p></td>
                <td>
                    <button class="btn-action-icon btn-action-delete" onclick="adminCMS.deleteService('${ser.id}')" title="Delete Service"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `).join('');
    }

    openAddServiceModal() {
        const modal = document.getElementById('add-service-modal');
        if (modal) modal.classList.add('active');
    }

    closeAddServiceModal() {
        const modal = document.getElementById('add-service-modal');
        if (modal) modal.classList.remove('active');
    }

    deleteService(id) {
        if (confirm('Are you sure you want to delete this service?')) {
            this.state.services = this.state.services.filter(s => s.id !== id);
            this.logActivity(`Deleted service ${id}`);
            this.saveState();
            this.renderServicesList();
        }
    }

    // Fleet CMS Page
    renderFleetList() {
        const tbody = document.getElementById('fleet-list-tbody');
        if (!tbody) return;

        tbody.innerHTML = this.state.fleet.map(f => `
            <tr>
                <td><img src="${f.image}" alt="${f.name}" style="width:60px; height:40px; object-fit:cover; border-radius:4px;"></td>
                <td><strong>${f.name}</strong></td>
                <td><span class="status-badge status-confirmed">${f.type}</span></td>
                <td>${f.capacity}</td>
                <td>
                    <button class="btn-action-icon btn-action-delete" onclick="adminCMS.deleteFleet('${f.id}')" title="Delete Vehicle"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `).join('');
    }

    openAddFleetModal() {
        const modal = document.getElementById('add-fleet-modal');
        if (modal) modal.classList.add('active');
    }

    closeAddFleetModal() {
        const modal = document.getElementById('add-fleet-modal');
        if (modal) modal.classList.remove('active');
    }

    deleteFleet(id) {
        const numericId = parseInt(id);
        if (confirm('Are you sure you want to delete this vehicle from the fleet?')) {
            this.state.fleet = this.state.fleet.filter(f => f.id !== numericId);
            this.logActivity(`Deleted vehicle fleet item ${id}`);
            this.saveState();
            this.renderFleetList();
        }
    }

    // Settings & Configuration
    renderSettings() {
        const headlineInput = document.getElementById('set-hero-headline');
        const subheadingInput = document.getElementById('set-hero-subheading');
        
        if (headlineInput && this.state.settings.homepage_headline) {
            headlineInput.value = this.state.settings.homepage_headline;
        }
        if (subheadingInput && this.state.settings.homepage_subheading) {
            subheadingInput.value = this.state.settings.homepage_subheading;
        }
    }

    // Activity Log Panel
    renderLogs() {
        const tbody = document.getElementById('logs-tbody');
        if (!tbody) return;

        tbody.innerHTML = this.state.logs.map(log => `
            <tr>
                <td><span style="font-family:monospace; font-size:0.85rem; color:var(--text-muted);">${log.time}</span></td>
                <td><span class="status-badge status-new" style="font-size:0.75rem;">${log.user}</span></td>
                <td>${log.event}</td>
            </tr>
        `).join('');
    }

    logActivity(eventDesc) {
        const newLog = {
            time: new Date().toISOString().replace('T', ' ').substring(0, 19),
            user: 'admin',
            event: eventDesc
        };
        this.state.logs.unshift(newLog);
        this.renderLogs();
    }

    initFormListeners() {
        // Service Submit
        const serviceForm = document.getElementById('form-add-service');
        if (serviceForm) {
            serviceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('ser-title').value;
                const desc = document.getElementById('ser-desc').value;
                const category = document.getElementById('ser-cat').value;
                const icon = document.getElementById('ser-icon').value || 'fa-truck';
                
                const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                
                const newSer = {
                    id,
                    title,
                    desc,
                    category,
                    icon,
                    image: 'assets/logistics-center.jpg' // default placeholder
                };

                this.state.services.push(newSer);
                this.logActivity(`Created new service category: ${title}`);
                this.saveState();
                this.renderServicesList();
                this.closeAddServiceModal();
                serviceForm.reset();
            });
        }

        // Fleet Submit
        const fleetForm = document.getElementById('form-add-fleet');
        if (fleetForm) {
            fleetForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('flt-name').value;
                const type = document.getElementById('flt-type').value;
                const capacity = document.getElementById('flt-capacity').value;
                const use = document.getElementById('flt-use').value;

                const newFleet = {
                    id: Date.now(),
                    name,
                    type,
                    capacity,
                    use,
                    image: 'assets/hero-truck.jpg' // default placeholder
                };

                this.state.fleet.push(newFleet);
                this.logActivity(`Added new vehicle fleet entry: ${name}`);
                this.saveState();
                this.renderFleetList();
                this.closeAddFleetModal();
                fleetForm.reset();
            });
        }

        // Settings Content Submit
        const settingsForm = document.getElementById('form-edit-settings');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const headline = document.getElementById('set-hero-headline').value;
                const subheading = document.getElementById('set-hero-subheading').value;

                this.state.settings.homepage_headline = headline;
                this.state.settings.homepage_subheading = subheading;
                
                this.logActivity('Updated dynamic homepage headers');
                this.saveState();
                
                alert('Homepage configuration saved successfully. Refresh your main website tab to see live changes!');
            });
        }

        // Database reset
        const resetBtn = document.getElementById('btn-reset-db');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Warning: This will restore all default templates and wipe current client inquiries. Proceed?')) {
                    localStorage.removeItem('packers_movers_state');
                    this.init();
                    alert('CMS database restored to original defaults.');
                }
            });
        }
    }
}

// Instantiate CMS globally
const adminCMS = new AdminCMS();
