/* ==========================================================================
   Ashapura Buildcon - Client-side Interactive Application Engine
   Contains: Property data, search & filtering, EMI calculations, modal control,
             testimonial carousels, and validation mechanisms.
   ========================================================================== */

// 1. PROPERTY DATA REPOSITORY
const propertiesData = [
    {
        id: 1,
        title: "3BHK Luxury Villa in Shastri Nagar",
        type: "Residential",
        purpose: "buy",
        badge: "sale",
        badgeText: "For Sale",
        bhk: "3",
        area: "2200 sqft",
        bath: "3",
        parking: "2",
        price: "₹1.2 Crores",
        priceValue: 12000000,
        location: "Shastri Nagar",
        city: "Jodhpur",
        highlights: ["East Facing", "Ready to Move", "RERA Approved"],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
        description: "This premium east-facing 3 BHK independent villa is situated in Jodhpur's most elite neighborhood, Shastri Nagar. Built on a plot of 250 sq yards, it offers ultra-luxury specifications, marble flooring, a spacious living salon, modular kitchen, individual water tank systems, and high safety boundary walls. Ready to move and fully RERA compliant.",
        rera: "RAJ/P/2023/4521"
    },
    {
        id: 2,
        title: "2BHK Modern Apartment on Pal Road",
        type: "Rental",
        purpose: "rent",
        badge: "rent",
        badgeText: "For Rent",
        bhk: "2",
        area: "1150 sqft",
        bath: "2",
        parking: "1",
        price: "₹18,000/month",
        priceValue: 18000,
        location: "Pal Road",
        city: "Jodhpur",
        highlights: ["Semi-Furnished", "24/7 Security", "Gated Township"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        description: "Superb semi-furnished 2 BHK apartment on a high floor inside a premium gated township on Pal Road. Excellent air circulation, wooden styling in master bedroom, modern modular kitchen with chimney, reserved covered parking space, and lift access with back-up generator. Located close to schools and banks.",
        rera: "N/A - Gated Apartment"
    },
    {
        id: 3,
        title: "Premium Commercial Shop in Sardarpura",
        type: "Commercial",
        purpose: "buy",
        badge: "new",
        badgeText: "New Launch",
        bhk: "Commercial",
        area: "450 sqft",
        bath: "1",
        parking: "1",
        price: "₹85 Lakhs",
        priceValue: 8500000,
        location: "Sardarpura",
        city: "Jodhpur",
        highlights: ["High Footfall", "Road Facing", "Pre-Leased Option"],
        image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
        description: "Excellent retail shop front in Sardarpura commercial lane. Built with glass frontages, standard double shutter systems, high ceilings, and separate electricity meters. An outstanding investment opportunity for clothing boutiques, clinic setups, or franchise agencies with high return ratios.",
        rera: "RAJ/P/2024/9088"
    },
    {
        id: 4,
        title: "Residential Plot in Uchiyarda",
        type: "Plot",
        purpose: "buy",
        badge: "sale",
        badgeText: "For Sale",
        bhk: "Plot",
        area: "1800 sqft",
        bath: "N/A",
        parking: "N/A",
        price: "₹35 Lakhs",
        priceValue: 3500000,
        location: "Uchiyarda",
        city: "Jodhpur",
        highlights: ["Corner Plot", "90B Cleared", "30ft Wide Road"],
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        description: "Ready-to-build corner residential plot located in a fast-developing neighborhood at Uchiyarda, Jodhpur. Fully 90B cleared with registry papers complete. Connected with a 30-foot metallic internal road and close to electricity grid connections. Boundary markers already established.",
        rera: "N/A - Land Plot"
    },
    {
        id: 5,
        title: "4BHK Premium Farmhouse in Chopasni",
        type: "Residential",
        purpose: "buy",
        badge: "sale",
        badgeText: "For Sale",
        bhk: "4+",
        area: "4800 sqft",
        bath: "4",
        parking: "4",
        price: "₹2.5 Crores",
        priceValue: 25000000,
        location: "Chopasni Housing Board",
        city: "Jodhpur",
        highlights: ["Private Pool", "Vaastu Compliant", "Lush Gardens"],
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
        description: "Experience ultimate luxury in this sprawling 4 BHK modern farmhouse retreat at Chopasni suburbs. Features a private swimming pool, beautifully manicured grass lawns, fully automated gates, double-height ceilings inside, separate servant quarters, and solar panel arrays already set up. Absolute serenity.",
        rera: "RAJ/P/2023/1124"
    },
    {
        id: 6,
        title: "3BHK Penthouse in Circuit House Road",
        type: "Residential",
        purpose: "buy",
        badge: "sale",
        badgeText: "For Sale",
        bhk: "3",
        area: "2600 sqft",
        bath: "3",
        parking: "2",
        price: "₹95 Lakhs",
        priceValue: 9500000,
        location: "Circuit House Road",
        city: "Jodhpur",
        highlights: ["Terrace Garden", "Ready to Move", "Premium Views"],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        description: "Elite 3 BHK duplex penthouse offering sweeping panoramic views of the city skyline and Umaid Bhawan Palace from the large private terrace deck. Premium Vitrified marble layouts, built-in wardrobes, centralized VRV air-conditioner piping, and exclusive elevator key access. Immediate registry available.",
        rera: "RAJ/P/2023/8854"
    }
];

// 2. STATE OBJECTS
let activePurposeTab = "buy"; // buy, rent, sell
let currentFilteredProperties = [...propertiesData];

// 3. DOM ELEMENT REFERENCES
document.addEventListener("DOMContentLoaded", () => {
    // Nav elements
    const navbarHeader = document.getElementById("navbar-header");
    const mobileToggle = document.getElementById("mobile-toggle");
    const mobileOverlay = document.getElementById("mobile-overlay");
    const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

    // Search Console tabs
    const tabBuy = document.getElementById("tab-buy");
    const tabRent = document.getElementById("tab-rent");
    const tabSell = document.getElementById("tab-sell");
    const searchInputsWrap = document.getElementById("search-inputs-wrap");
    const sellFormNotice = document.getElementById("sell-form-notice");
    const searchLocation = document.getElementById("search-location");
    const searchType = document.getElementById("search-type");
    const searchBudget = document.getElementById("search-budget");
    const btnSearchTrigger = document.getElementById("btn-search-trigger");

    // Property Grid Elements
    const propertiesGridContainer = document.getElementById("properties-grid-container");
    const emptyListingsState = document.getElementById("empty-listings-state");
    const btnResetEmptySearch = document.getElementById("btn-reset-empty-search");
    
    // Filters Panel Elements
    const filterKeyword = document.getElementById("filter-keyword");
    const filterType = document.getElementById("filter-type");
    const filterBhk = document.getElementById("filter-bhk");
    const filterBudget = document.getElementById("filter-budget");
    const filterLocation = document.getElementById("filter-location");
    const btnClearFilters = document.getElementById("btn-clear-filters");
    const activeFiltersText = document.getElementById("active-filters-text");

    // Category Cards
    const categoryCards = document.querySelectorAll(".category-card");

    // Modals
    const propertyDetailsModal = document.getElementById("property-details-modal");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const modalPropertyContent = document.getElementById("modal-property-content");
    const valuationModal = document.getElementById("valuation-modal");
    const btnCloseValModal = document.getElementById("btn-close-val-modal");
    const btnNavbarValuation = document.getElementById("btn-navbar-valuation");
    const mobileBtnValuation = document.getElementById("mobile-btn-valuation");
    const btnTriggerValuationModal = document.getElementById("btn-trigger-valuation-modal");
    const btnFooterValuation = document.getElementById("btn-footer-valuation");

    // Forms
    const propertyEnquiryForm = document.getElementById("property-enquiry-form");
    const valuationEnquiryForm = document.getElementById("valuation-enquiry-form");
    const formPhoneInput = document.getElementById("form-phone");
    const errFormPhone = document.getElementById("err-form-phone");

    // EMI Calculator
    const inputLoanAmount = document.getElementById("input-loan-amount");
    const inputInterestRate = document.getElementById("input-interest-rate");
    const inputTenure = document.getElementById("input-tenure");
    const lblLoanAmount = document.getElementById("lbl-loan-amount");
    const lblInterestRate = document.getElementById("lbl-interest-rate");
    const lblTenure = document.getElementById("lbl-tenure");
    const lblResultEmi = document.getElementById("lbl-result-emi");
    const lblBreakdownPrincipal = document.getElementById("lbl-breakdown-principal");
    const lblBreakdownInterest = document.getElementById("lbl-breakdown-interest");
    const lblBreakdownTotal = document.getElementById("lbl-breakdown-total");
    const barPrincipal = document.getElementById("bar-principal");
    const barInterest = document.getElementById("bar-interest");
    const lblPctPrincipal = document.getElementById("lbl-pct-principal");
    const lblPctInterest = document.getElementById("lbl-pct-interest");

    // Testimonial elements
    const testimonialSlides = document.querySelectorAll(".testimonial-slide");
    const testimonialDots = document.querySelectorAll(".t-dot");
    const btnTPrev = document.getElementById("btn-t-prev");
    const btnTNext = document.getElementById("btn-t-next");

    // Project Brochure Inquiry Elements
    const projectInquireBtns = document.querySelectorAll(".project-inquire-btn");

    // Toasts
    const toastSuccess = document.getElementById("toast-success");
    const toastTitle = document.getElementById("toast-title");
    const toastDesc = document.getElementById("toast-desc");

    // 4. NAV SCROLL SHADOW ACTION
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbarHeader.classList.add("scrolled");
        } else {
            navbarHeader.classList.remove("scrolled");
        }
        updateActiveNavHighlightOnScroll();
    });

    // 5. MOBILE NAV TOGGLE
    mobileToggle.addEventListener("click", () => {
        mobileToggle.classList.toggle("open");
        mobileOverlay.classList.toggle("open");
    });

    mobileNavItems.forEach(item => {
        item.addEventListener("click", () => {
            mobileToggle.classList.remove("open");
            mobileOverlay.classList.remove("open");
        });
    });

    // 6. HERO SEARCH BAR TABS INTERACTION
    const switchSearchTab = (purpose) => {
        activePurposeTab = purpose;
        
        tabBuy.classList.remove("active-tab");
        tabRent.classList.remove("active-tab");
        tabSell.classList.remove("active-tab");

        if (purpose === "buy") {
            tabBuy.classList.add("active-tab");
            searchInputsWrap.classList.remove("hidden");
            sellFormNotice.classList.add("search-notice-hidden");
        } else if (purpose === "rent") {
            tabRent.classList.add("active-tab");
            searchInputsWrap.classList.remove("hidden");
            sellFormNotice.classList.add("search-notice-hidden");
        } else if (purpose === "sell") {
            tabSell.classList.add("active-tab");
            searchInputsWrap.classList.add("hidden");
            sellFormNotice.classList.remove("search-notice-hidden");
        }
    };

    tabBuy.addEventListener("click", () => switchSearchTab("buy"));
    tabRent.addEventListener("click", () => switchSearchTab("rent"));
    tabSell.addEventListener("click", () => switchSearchTab("sell"));

    // 7. INITIATE RENDER OF PROPERTY LISTINGS
    const renderProperties = (dataToRender) => {
        propertiesGridContainer.innerHTML = "";
        
        if (dataToRender.length === 0) {
            propertiesGridContainer.classList.add("hidden");
            emptyListingsState.classList.remove("hidden");
            activeFiltersText.textContent = "Showing 0 properties";
            return;
        }

        propertiesGridContainer.classList.remove("hidden");
        emptyListingsState.classList.add("hidden");
        activeFiltersText.textContent = `Showing ${dataToRender.length} property${dataToRender.length > 1 ? 'ies' : ''}`;

        dataToRender.forEach(prop => {
            const card = document.createElement("div");
            card.className = "property-card";
            card.setAttribute("data-id", prop.id);
            
            // Format price label in Indian Rupee format
            let priceDisplay = prop.price;
            
            // Highlights string builder
            const highlightsHtml = prop.highlights.map(hl => `<span class="highlight-tag">${hl}</span>`).join("");
            
            // Configuration representation text
            const configText = prop.bhk === "Plot" || prop.bhk === "Commercial" ? prop.bhk : `${prop.bhk} BHK`;

            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${prop.image}" alt="${prop.title}" class="card-image" loading="lazy">
                    <span class="card-badge ${prop.badge}">${prop.badgeText}</span>
                    <div class="card-price-overlay">${priceDisplay}</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title" title="${prop.title}">${prop.title}</h3>
                    <div class="card-location">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>${prop.location}, Jodhpur</span>
                    </div>
                    <div class="card-details-row">
                        <span>${configText}</span>
                        <span class="details-divider">|</span>
                        <span>${prop.area}</span>
                        ${prop.bath !== "N/A" ? `<span class="details-divider">|</span><span>${prop.bath} Bath</span>` : ''}
                        ${prop.parking !== "N/A" ? `<span class="details-divider">|</span><span>${prop.parking} Pkg</span>` : ''}
                    </div>
                    <div class="card-highlights">
                        ${highlightsHtml}
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-outline btn-sm btn-view-details" data-id="${prop.id}">View Details</button>
                        <button class="btn btn-gold btn-sm btn-card-whatsapp" data-id="${prop.id}">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.023-5.11-2.885-6.974C16.59 1.908 14.11 1.88 11.472 1.88c-5.437 0-9.863 4.42-9.866 9.859-.001 1.762.47 3.483 1.365 5.013l-.993 3.626 3.72-.975zm13.114-6.84c-.29-.145-1.716-.847-1.983-.944-.266-.098-.46-.145-.654.145-.193.29-.748.944-.917 1.137-.168.193-.338.217-.628.072-.29-.145-1.222-.45-2.328-1.437-.86-.767-1.44-1.716-1.61-2.006-.17-.29-.018-.447.127-.592.13-.13.29-.338.435-.507.145-.168.193-.29.29-.483.097-.193.048-.36-.024-.507-.072-.145-.654-1.57-.894-2.15-.235-.568-.475-.49-.654-.5-.168-.008-.362-.01-.555-.01-.194 0-.508.072-.774.362-.266.29-1.015.99-1.015 2.413 0 1.42 1.034 2.797 1.178 2.99.145.194 2.036 3.102 4.93 4.354.688.297 1.226.474 1.643.606.692.22 1.32.19 1.817.115.553-.083 1.717-.7 1.958-1.376.242-.677.242-1.256.17-1.376-.073-.12-.267-.194-.556-.34z"/></svg>
                            <span>WhatsApp</span>
                        </button>
                    </div>
                </div>
            `;
            propertiesGridContainer.appendChild(card);
        });

        // Rebind events for view details and whatsapp
        bindCardInteractions();
    };

    // 8. FILTER MECHANISM LOGIC
    const applyFilters = () => {
        let keywordVal = filterKeyword.value.toLowerCase().trim();
        let typeVal = filterType.value;
        let bhkVal = filterBhk.value;
        let budgetVal = filterBudget.value;
        let locationVal = filterLocation.value;

        let filtered = propertiesData.filter(prop => {
            // Keyword check (Title, location, description, highlights)
            if (keywordVal !== "") {
                const inTitle = prop.title.toLowerCase().includes(keywordVal);
                const inLoc = prop.location.toLowerCase().includes(keywordVal);
                const inDesc = prop.description.toLowerCase().includes(keywordVal);
                const inHl = prop.highlights.some(h => h.toLowerCase().includes(keywordVal));
                
                if (!inTitle && !inLoc && !inDesc && !inHl) {
                    return false;
                }
            }

            // Type filter
            if (typeVal !== "") {
                if (prop.type !== typeVal) return false;
            }

            // BHK filter
            if (bhkVal !== "") {
                if (bhkVal === "4+") {
                    if (prop.bhk !== "4" && prop.bhk !== "4+" && prop.bhk !== "Villa" && prop.bhk !== "Studio") {
                        return false;
                    }
                } else if (bhkVal === "Villa") {
                    if (!prop.title.toLowerCase().includes("villa") && prop.bhk !== "Villa") return false;
                } else {
                    if (prop.bhk !== bhkVal) return false;
                }
            }

            // Location filter
            if (locationVal !== "") {
                if (prop.location !== locationVal) return false;
            }

            // Budget filter (dropdown ranges: 10L-20L, 20L-50L, 50L-1Cr, 1Cr-2Cr, 2Cr-5Cr, 5Cr+)
            if (budgetVal !== "") {
                const val = prop.priceValue;
                if (budgetVal === "10L-20L") {
                    if (val < 1000000 || val > 2000000) return false;
                } else if (budgetVal === "20L-50L") {
                    if (val < 2000000 || val > 5000000) return false;
                } else if (budgetVal === "50L-1Cr") {
                    if (val < 5000000 || val > 10000000) return false;
                } else if (budgetVal === "1Cr-2Cr") {
                    if (val < 10000000 || val > 20000000) return false;
                } else if (budgetVal === "2Cr-5Cr") {
                    if (val < 20000000 || val > 50000000) return false;
                } else if (budgetVal === "5Cr+") {
                    if (val < 50000000) return false;
                }
            }

            return true;
        });

        currentFilteredProperties = filtered;
        renderProperties(filtered);
    };

    // Bind filters panel listeners
    filterKeyword.addEventListener("input", applyFilters);
    filterType.addEventListener("change", applyFilters);
    filterBhk.addEventListener("change", applyFilters);
    filterBudget.addEventListener("change", applyFilters);
    filterLocation.addEventListener("change", applyFilters);

    btnClearFilters.addEventListener("click", () => {
        filterKeyword.value = "";
        filterType.value = "";
        filterBhk.value = "";
        filterBudget.value = "";
        filterLocation.value = "";
        applyFilters();
    });

    btnResetEmptySearch.addEventListener("click", () => {
        filterKeyword.value = "";
        filterType.value = "";
        filterBhk.value = "";
        filterBudget.value = "";
        filterLocation.value = "";
        applyFilters();
    });

    // 9. HERO SEARCH SUBMIT ACTION
    btnSearchTrigger.addEventListener("click", () => {
        const loc = searchLocation.value;
        const type = searchType.value;
        const budgetVal = searchBudget.value; // numeric max budget threshold

        // Sync values to properties filters panel
        filterLocation.value = loc;
        filterType.value = type;
        
        // Match budget selection threshold
        if (budgetVal !== "") {
            const num = parseInt(budgetVal);
            if (num <= 2000000) {
                filterBudget.value = "10L-20L";
            } else if (num <= 5000000) {
                filterBudget.value = "20L-50L";
            } else if (num <= 10000000) {
                filterBudget.value = "50L-1Cr";
            } else if (num <= 20000000) {
                filterBudget.value = "1Cr-2Cr";
            } else {
                filterBudget.value = "2Cr-5Cr";
            }
        } else {
            filterBudget.value = "";
        }

        // Apply filters and smooth scroll down
        applyFilters();
        
        const offsetTop = document.getElementById("properties-section").offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    });

    // 10. CATEGORY CARDS INTERACTIVE FILTER SYNC
    categoryCards.forEach(card => {
        card.addEventListener("click", () => {
            const catType = card.getAttribute("data-category");
            const catBhk = card.getAttribute("data-bhk");

            // Reset filters first
            filterKeyword.value = "";
            filterLocation.value = "";
            filterBudget.value = "";
            
            // Set values based on category clicked
            if (catType) {
                filterType.value = catType;
            } else {
                filterType.value = "";
            }

            if (catBhk) {
                filterBhk.value = catBhk;
            } else {
                filterBhk.value = "";
            }

            applyFilters();

            const offsetTop = document.getElementById("properties-section").offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });
    });

    // 11. BIND DETAILS MODAL AND WHATSAPP TRIGGERS
    const bindCardInteractions = () => {
        const viewDetailBtns = document.querySelectorAll(".btn-view-details");
        const waBtns = document.querySelectorAll(".btn-card-whatsapp");

        viewDetailBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.getAttribute("data-id"));
                openPropertyDetailsModal(id);
            });
        });

        waBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.getAttribute("data-id"));
                triggerWhatsAppInquiry(id);
            });
        });
    };

    // 12. POPULATE & OPEN DETAILED PROPERTY MODAL
    const openPropertyDetailsModal = (id) => {
        const prop = propertiesData.find(p => p.id === id);
        if (!prop) return;

        const configText = prop.bhk === "Plot" || prop.bhk === "Commercial" ? prop.bhk : `${prop.bhk} BHK Configuration`;
        const highlightsHtml = prop.highlights.map(hl => `<span class="highlight-tag">${hl}</span>`).join("");

        modalPropertyContent.innerHTML = `
            <div class="modal-image-gallery">
                <img src="${prop.image}" alt="${prop.title}" class="modal-gallery-img">
                <span class="card-badge ${prop.badge} modal-gallery-badge">${prop.badgeText}</span>
            </div>
            <div class="modal-info-panel">
                <span class="section-subtitle">Property ID: #AB-0${prop.id}</span>
                <h3 class="modal-title">${prop.title}</h3>
                <div class="card-location">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>${prop.location}, Jodhpur, Rajasthan</span>
                </div>
                
                <h4 class="modal-price">${prop.price} <span>| RERA Reg: ${prop.rera}</span></h4>

                <div class="modal-specs-list">
                    <div class="modal-spec-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                        <span><strong>Type:</strong> ${prop.type}</span>
                    </div>
                    <div class="modal-spec-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                        <span><strong>Layout:</strong> ${configText}</span>
                    </div>
                    <div class="modal-spec-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span><strong>Size Area:</strong> ${prop.area}</span>
                    </div>
                    <div class="modal-spec-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                        <span><strong>Status:</strong> Approved</span>
                    </div>
                </div>

                <div class="modal-highlights">
                    ${highlightsHtml}
                </div>

                <p class="modal-desc-text">${prop.description}</p>

                <div class="modal-actions-row">
                    <button class="btn btn-outline modal-btn-callback" data-title="${prop.title}">Request Call Back</button>
                    <button class="btn btn-gold modal-btn-whatsapp" data-id="${prop.id}">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="mr-2"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.023-5.11-2.885-6.974C16.59 1.908 14.11 1.88 11.472 1.88c-5.437 0-9.863 4.42-9.866 9.859-.001 1.762.47 3.483 1.365 5.013l-.993 3.626 3.72-.975zm13.114-6.84c-.29-.145-1.716-.847-1.983-.944-.266-.098-.46-.145-.654.145-.193.29-.748.944-.917 1.137-.168.193-.338.217-.628.072-.29-.145-1.222-.45-2.328-1.437-.86-.767-1.44-1.716-1.61-2.006-.17-.29-.018-.447.127-.592.13-.13.29-.338.435-.507.145-.168.193-.29.29-.483.097-.193.048-.36-.024-.507-.072-.145-.654-1.57-.894-2.15-.235-.568-.475-.49-.654-.5-.168-.008-.362-.01-.555-.01-.194 0-.508.072-.774.362-.266.29-1.015.99-1.015 2.413 0 1.42 1.034 2.797 1.178 2.99.145.194 2.036 3.102 4.93 4.354.688.297 1.226.474 1.643.606.692.22 1.32.19 1.817.115.553-.083 1.717-.7 1.958-1.376.242-.677.242-1.256.17-1.376-.073-.12-.267-.194-.556-.34z"/></svg>
                        <span>WhatsApp Inquire</span>
                    </button>
                </div>
            </div>
        `;

        propertyDetailsModal.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // lock page scroll

        // Bind inner buttons
        const btnCallback = modalPropertyContent.querySelector(".modal-btn-callback");
        btnCallback.addEventListener("click", () => {
            const propTitle = btnCallback.getAttribute("data-title");
            
            // Populate form message with specific request
            document.getElementById("form-message").value = `Hi, I am interested in "${propTitle}". Please provide pricing plans, layout brochures and confirm when I can schedule a site visit.`;
            document.getElementById("form-purpose").value = prop.purpose === "buy" ? "Buy" : "Rent";
            document.getElementById("form-location").value = prop.location;
            
            // Close modal and scroll to form
            closeDetailsModal();
            const offsetTop = document.getElementById("enquiry-section").offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });

        const btnWa = modalPropertyContent.querySelector(".modal-btn-whatsapp");
        btnWa.addEventListener("click", () => {
            const id = parseInt(btnWa.getAttribute("data-id"));
            triggerWhatsAppInquiry(id);
        });
    };

    const closeDetailsModal = () => {
        propertyDetailsModal.classList.add("hidden");
        document.body.style.overflow = ""; // restore page scroll
    };

    btnCloseModal.addEventListener("click", closeDetailsModal);
    
    // Close modal when clicking outside content container
    propertyDetailsModal.addEventListener("click", (e) => {
        if (e.target === propertyDetailsModal) {
            closeDetailsModal();
        }
    });

    // 13. WHATSAPP LINK PREPARATION
    const triggerWhatsAppInquiry = (id) => {
        const prop = propertiesData.find(p => p.id === id);
        if (!prop) return;
        
        const text = `Hi Ashapura Buildcon, I am interested in the following property listing:\n\n*Listing:* ${prop.title}\n*Location:* ${prop.location}, Jodhpur\n*Price:* ${prop.price}\n*RERA:* ${prop.rera}\n\nPlease share more details and a location map. Thank you.`;
        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/919898585474?text=${encodedText}`;
        window.open(url, "_blank");
    };

    // 14. VALUATION MODAL TOGGLE BINDING
    const openValuationModal = () => {
        valuationModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    };

    const closeValuationModal = () => {
        valuationModal.classList.add("hidden");
        document.body.style.overflow = "";
    };

    btnNavbarValuation.addEventListener("click", openValuationModal);
    mobileBtnValuation.addEventListener("click", openValuationModal);
    btnTriggerValuationModal.addEventListener("click", openValuationModal);
    btnFooterValuation.addEventListener("click", openValuationModal);
    btnCloseValModal.addEventListener("click", closeValuationModal);

    valuationModal.addEventListener("click", (e) => {
        if (e.target === valuationModal) {
            closeValuationModal();
        }
    });

    // 15. HOME LOAN EMI CALCULATOR ENGINE
    const formatRupees = (amount) => {
        // Simple local Indian currency formatter
        return "₹" + Number(amount).toLocaleString('en-IN');
    };

    const calculateEMI = () => {
        const p = parseFloat(inputLoanAmount.value);       // Principal amount
        const r = parseFloat(inputInterestRate.value) / 12 / 100; // Monthly interest rate
        const n = parseFloat(inputTenure.value) * 12;      // Total number of monthly installments

        // EMI Formula: P * r * (1 + r)^n / [ (1 + r)^n - 1 ]
        let emi = 0;
        if (r === 0) {
            emi = p / n;
        } else {
            emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        }

        const monthlyEmi = Math.round(emi);
        const totalPayment = monthlyEmi * n;
        const totalInterest = totalPayment - p;

        // Calculate percentages
        const principalPct = Math.round((p / totalPayment) * 100);
        const interestPct = 100 - principalPct;

        // Render values
        lblLoanAmount.textContent = formatRupees(p);
        lblInterestRate.textContent = `${inputInterestRate.value}%`;
        lblTenure.textContent = `${inputTenure.value} Years`;

        lblResultEmi.textContent = formatRupees(monthlyEmi);
        lblBreakdownPrincipal.textContent = formatRupees(p);
        lblBreakdownInterest.textContent = formatRupees(totalInterest);
        lblBreakdownTotal.textContent = formatRupees(totalPayment);

        // Update progress bar width percentages
        barPrincipal.style.width = `${principalPct}%`;
        barInterest.style.width = `${interestPct}%`;
        
        lblPctPrincipal.textContent = `${principalPct}%`;
        lblPctInterest.textContent = `${interestPct}%`;
    };

    // Bind slider events
    inputLoanAmount.addEventListener("input", calculateEMI);
    inputInterestRate.addEventListener("input", calculateEMI);
    inputTenure.addEventListener("input", calculateEMI);

    // Initial calculation
    calculateEMI();

    // 16. TESTIMONIAL SLIDER INTERACTION
    let currentSlide = 0;
    const numSlides = testimonialSlides.length;

    const showSlide = (idx) => {
        testimonialSlides.forEach(slide => slide.classList.remove("active-slide"));
        testimonialDots.forEach(dot => dot.classList.remove("active-dot"));

        testimonialSlides[idx].classList.add("active-slide");
        testimonialDots[idx].classList.add("active-dot");
        currentSlide = idx;
    };

    const nextTestimonial = () => {
        let nextIdx = (currentSlide + 1) % numSlides;
        showSlide(nextIdx);
    };

    const prevTestimonial = () => {
        let prevIdx = (currentSlide - 1 + numSlides) % numSlides;
        showSlide(prevIdx);
    };

    btnTNext.addEventListener("click", nextTestimonial);
    btnTPrev.addEventListener("click", prevTestimonial);

    testimonialDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const idx = parseInt(dot.getAttribute("data-index"));
            showSlide(idx);
        });
    });

    // Auto rotate testimonials every 6 seconds
    setInterval(nextTestimonial, 6000);

    // 17. TRIGGER TOAST SUCCESS NOTIFICATION
    const triggerToast = (title, message) => {
        toastTitle.textContent = title;
        toastDesc.textContent = message;
        
        toastSuccess.classList.remove("hidden");
        
        // Hide after 5 seconds
        setTimeout(() => {
            toastSuccess.classList.add("hidden");
        }, 5000);
    };

    // 18. ENQUIRY FORM SUBMISSION & VALIDATION
    propertyEnquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameVal = document.getElementById("form-name").value.trim();
        const phoneVal = formPhoneInput.value.trim();
        const purposeVal = document.getElementById("form-purpose").value;
        const typeVal = document.getElementById("form-type").value;
        const budgetVal = document.getElementById("form-budget").value;
        const locationVal = document.getElementById("form-location").value;
        const messageVal = document.getElementById("form-message").value.trim();

        // Phone number validation (10 digit Indian number pattern)
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(phoneVal)) {
            formPhoneInput.classList.add("invalid-input");
            errFormPhone.textContent = "Please enter a valid 10-digit Indian phone number.";
            errFormPhone.style.display = "block";
            formPhoneInput.focus();
            return;
        } else {
            formPhoneInput.classList.remove("invalid-input");
            errFormPhone.style.display = "none";
        }

        // Send enquiry details (mock backend submit)
        console.log("Submission details:", { nameVal, phoneVal, purposeVal, typeVal, budgetVal, locationVal, messageVal });
        
        // Clear form
        propertyEnquiryForm.reset();
        
        // Trigger Toast Notification
        triggerToast(
            "Enquiry Submitted Successfully", 
            `Thank you ${nameVal}! Manish will contact you shortly on ${phoneVal}.`
        );
    });

    // Reset phone error styling on keydown
    formPhoneInput.addEventListener("input", () => {
        if (formPhoneInput.classList.contains("invalid-input")) {
            formPhoneInput.classList.remove("invalid-input");
            errFormPhone.style.display = "none";
        }
    });

    // 19. VALUATION REQUEST SUBMISSION
    valuationEnquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameVal = document.getElementById("val-name").value.trim();
        const phoneVal = document.getElementById("val-phone").value.trim();
        const typeVal = document.getElementById("val-type").value;
        const locationVal = document.getElementById("val-location").value;
        const sizeVal = document.getElementById("val-size").value.trim();
        const ageVal = document.getElementById("val-age").value.trim();

        // Simple validation
        if (nameVal === "" || phoneVal === "" || sizeVal === "") {
            return;
        }

        // Mock submit
        console.log("Valuation Enquiry Submitted:", { nameVal, phoneVal, typeVal, locationVal, sizeVal, ageVal });

        // Close modal
        closeValuationModal();
        
        // Reset form
        valuationEnquiryForm.reset();
        
        // Trigger Toast
        triggerToast(
            "Valuation Request Submitted", 
            `Manish will call you back with a price assessment for your property in ${locationVal}.`
        );
    });

    // 20. NEW LAUNCHES DEVELOPER CARD BROCHURE BUTTON
    projectInquireBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const project = btn.getAttribute("data-project");
            
            // Prefill form message with brochure inquiry
            document.getElementById("form-message").value = `Hi Manish, I want to download the official floor plan layout and pricing brochure for the new developer launch: "${project}". Please share it on WhatsApp.`;
            document.getElementById("form-purpose").value = "Buy";
            document.getElementById("form-type").value = project.toLowerCase().includes("villa") ? "Villa" : "Apartment";
            
            const offsetTop = document.getElementById("enquiry-section").offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });
    });

    // 21. SCROLL SPY FOR NAVBAR ACTIVE MENU HIGHLIGHT
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-item");

    const updateActiveNavHighlightOnScroll = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active-nav");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active-nav");
                    }
                });
            }
        });
    };

    // 22. INITIAL PORTAL DATA RENDER
    renderProperties(propertiesData);
});
