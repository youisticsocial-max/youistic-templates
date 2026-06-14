// --- MENU DATABASE ---
const menuItems = [
  // STARTERS
  {
    id: "st-dal-baati",
    name: "Dal Baati Churma",
    desc: "Golden wood-baked wheat rolls soaked in fresh ghee, served with panchmel dal & sweet churma.",
    price: 220,
    veg: true,
    category: "starters",
    image: "assets/dal_baati.png"
  },
  {
    id: "st-ker-sangri",
    name: "Desert Ker Sangri",
    desc: "Traditional dry desert beans and berries cooked with raisins, spices, and mustard oil.",
    price: 180,
    veg: true,
    category: "starters",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "st-pyaaz-kachori",
    name: "Jodhpuri Pyaaz Kachori",
    desc: "Crispy, golden-fried flaky pastry filled with a highly spiced, onion stuffing.",
    price: 90,
    veg: true,
    category: "starters",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "st-mirchi-bada",
    name: "Heritage Mirchi Bada",
    desc: "Large Jodhpuri green chilies stuffed with spiced potato mash, batter-fried.",
    price: 80,
    veg: true,
    category: "starters",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "st-seekh-kebab",
    name: "Tandoori Seekh Kebab",
    desc: "Skewered minced lamb seasoned with fresh mint, coriander, and royal warm spices.",
    price: 280,
    veg: false,
    category: "starters",
    image: "https://images.unsplash.com/photo-1628294895520-73f1a2cc6f94?w=500&auto=format&fit=crop&q=60"
  },

  // MAIN COURSE
  {
    id: "mc-laal-maas",
    name: "Rajasthani Laal Maas",
    desc: "Fiery mutton curry slow-cooked with Jodhpur's heritage dry Mathania red chilies.",
    price: 380,
    veg: false,
    category: "main-course",
    image: "assets/laal_maas.png"
  },
  {
    id: "mc-gatte-sabzi",
    name: "Shahi Gatte ki Sabzi",
    desc: "Gram flour dumplings cooked in a rich, traditional spiced yogurt-based gravy.",
    price: 210,
    veg: true,
    category: "main-course",
    image: "https://images.unsplash.com/photo-1547825407-2d060104b7f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "mc-paneer-butter",
    name: "Paneer Butter Masala",
    desc: "Soft cottage cheese cubes cooked in a rich, buttery, tomato-onion cream sauce.",
    price: 240,
    veg: true,
    category: "main-course",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "mc-butter-chicken",
    name: "Old Delhi Butter Chicken",
    desc: "Tandoori chicken pieces simmered in a velvety tomato gravy with loads of butter.",
    price: 320,
    veg: false,
    category: "main-course",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "mc-dal-makhani",
    name: "Dhaba Dal Makhani",
    desc: "Black lentils slow-cooked overnight on charcoal, finished with butter and cream.",
    price: 220,
    veg: true,
    category: "main-course",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60"
  },

  // BREADS
  {
    id: "br-tandoori-roti",
    name: "Tandoori Roti",
    desc: "Traditional whole wheat flatbread baked inside a charcoal clay oven.",
    price: 30,
    veg: true,
    category: "breads",
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "br-butter-naan",
    name: "Butter Naan",
    desc: "Soft, leavened white flour flatbread glazed with generous butter.",
    price: 50,
    veg: true,
    category: "breads",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "br-missi-roti",
    name: "Rajasthani Missi Roti",
    desc: "Nutritious gram flour bread kneaded with fenugreek, coriander, and mild spices.",
    price: 45,
    veg: true,
    category: "breads",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "br-garlic-cheese-naan",
    name: "Garlic Cheese Naan",
    desc: "Tandoor naan stuffed with gooey cheese, topped with roasted garlic and butter.",
    price: 80,
    veg: true,
    category: "breads",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60"
  },

  // RICE & BIRYANI
  {
    id: "rc-kabuli",
    name: "Jodhpuri Kabuli Rice",
    desc: "A rich layered rice dish cooked with chickpeas, fried potatoes, yogurt, and dry fruits.",
    price: 190,
    veg: true,
    category: "rice-biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "rc-chicken-biryani",
    name: "Tandoori Chicken Biryani",
    desc: "Long grain Basmati rice layered with spiced chicken, dum-cooked with saffron.",
    price: 310,
    veg: false,
    category: "rice-biryani",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "rc-jeera",
    name: "Jeera Basmati Rice",
    desc: "Aromatic Basmati rice tossed with cumin seeds and pure cow ghee.",
    price: 140,
    veg: true,
    category: "rice-biryani",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60"
  },

  // DESSERTS
  {
    id: "ds-churma",
    name: "Royal Churma",
    desc: "Sweet, crumbly dry fruit-roasted wheat dessert made in organic ghee.",
    price: 120,
    veg: true,
    category: "desserts",
    image: "assets/dal_baati.png"
  },
  {
    id: "ds-malpua",
    name: "Malpua with Rabdi",
    desc: "Syrup-soaked fried sweet pancakes topped with thick, cardamom-flavored rabdi.",
    price: 160,
    veg: true,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "ds-ghevar",
    name: "Traditional Ghevar",
    desc: "Classic Rajasthani disc honeycomb sweet cake soaked in saffron sugar syrup.",
    price: 180,
    veg: true,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1605698808117-91a58c1dbf1a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "ds-halwa",
    name: "Moong Dal Halwa",
    desc: "Slow-roasted split yellow mung bean pudding cooked with ghee, sugar, and almonds.",
    price: 140,
    veg: true,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60"
  },

  // BEVERAGES
  {
    id: "bv-kesar-lassi",
    name: "Jodhpuri Kesar Lassi",
    desc: "Thick sweet yogurt drink churned with saffron strands, pistachios, and almonds.",
    price: 80,
    veg: true,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bv-chaas",
    name: "Spiced Masala Chaas",
    desc: "Refreshing buttermilk blended with roasted cumin, green chili, mint, and black salt.",
    price: 55,
    veg: true,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "bv-chai",
    name: "Dhaba Masala Chai",
    desc: "Traditional hot tea brewed with fresh ginger, cardamom, cinnamon, and whole milk.",
    price: 40,
    veg: true,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60"
  },

  // THALIS
  {
    id: "th-rajasthani",
    name: "Rajasthani Thali",
    desc: "Authentic platter: Dal, Baati (2 pcs), Churma, Gatte ki Sabzi, Raita, Papad, Lahsun Chutney.",
    price: 350,
    veg: true,
    category: "thali",
    image: "assets/thali.png"
  },
  {
    id: "th-royal",
    name: "Royal Relish Thali (12+ Items)",
    desc: "Dal, Baati (3 pcs), 2 Churmas, Gatta Sabzi, Ker Sangri, Kadhi, Missi Roti, Rice, Lassi, 2 Sweets.",
    price: 550,
    veg: true,
    category: "thali",
    image: "assets/thali.png"
  },
  {
    id: "th-mini",
    name: "Mini Thali (Lunch Special)",
    desc: "Gatta Curry, Yellow Dal, Choice of 2 Rotis or Rice, Papad, Raita, and Sweet.",
    price: 220,
    veg: true,
    category: "thali",
    image: "assets/thali.png"
  }
];

// --- APP STATE ---
let currentCategory = "starters";
let isVegOnly = false;
let cart = [];

// --- DOM ELEMENTS ---
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const specialBanner = document.getElementById("special-banner");
const closeBannerBtn = document.getElementById("close-banner-btn");
const menuTabs = document.getElementById("menu-tabs");
const vegToggle = document.getElementById("veg-toggle");
const menuGrid = document.getElementById("menu-grid");
const floatingWaBtn = document.getElementById("floating-whatsapp");

// Cart elements
const emptyCartMsg = document.getElementById("empty-cart-msg");
const cartItemsList = document.getElementById("cart-items-list");
const cartSummary = document.getElementById("cart-summary");
const cartTotalPrice = document.getElementById("cart-total-price");
const sendWaOrderBtn = document.getElementById("send-wa-order-btn");

// Reservation Form
const reservationForm = document.getElementById("reservation-form");

// Catering Form Modal
const cateringModal = document.getElementById("catering-modal");
const openCateringModalBtn = document.getElementById("open-catering-modal-btn");
const closeCateringModalBtn = document.getElementById("close-catering-modal-btn");
const cateringForm = document.getElementById("catering-form");

// Success Toast Modal
const successModal = document.getElementById("success-modal");
const successModalTitle = document.getElementById("success-modal-title");
const successModalMessage = document.getElementById("success-modal-message");
const successModalCloseBtn = document.getElementById("success-modal-close-btn");

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

// Reviews Slider
const reviewsTrack = document.getElementById("reviews-slider-track");
const reviewSlides = document.querySelectorAll(".review-slide");
const reviewPrevBtn = document.getElementById("review-prev");
const reviewNextBtn = document.getElementById("review-next");
const reviewsDotsContainer = document.getElementById("reviews-dots");
let currentReviewIndex = 0;
let reviewAutoPlayInterval;

// --- STICKY NAV & MOBILE HEADER ---
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close banner
closeBannerBtn.addEventListener("click", () => {
  specialBanner.classList.add("hidden");
});

// --- MENU CATEGORIES & VEG TOGGLE ---
// Event Listeners for tabs
if (menuTabs) {
  menuTabs.addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-btn")) {
      document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentCategory = e.target.getAttribute("data-category");
      renderMenu();
    }
  });
}

// Veg/Non-Veg Toggle
if (vegToggle) {
  vegToggle.addEventListener("change", (e) => {
    isVegOnly = e.target.checked;
    renderMenu();
    
    // Highlight labels
    const labelVeg = document.querySelector(".label-veg");
    const labelNonveg = document.querySelector(".label-nonveg");
    if (isVegOnly) {
      labelVeg.style.fontWeight = "700";
      labelNonveg.style.fontWeight = "400";
    } else {
      labelVeg.style.fontWeight = "400";
      labelNonveg.style.fontWeight = "700";
    }
  });
}

// Render menu cards
function renderMenu() {
  if (!menuGrid) return;
  menuGrid.style.opacity = "0";
  
  setTimeout(() => {
    menuGrid.innerHTML = "";
    
    // Filter
    let filteredItems = menuItems.filter(item => item.category === currentCategory);
    if (isVegOnly) {
      filteredItems = filteredItems.filter(item => item.veg === true);
    }
    
    if (filteredItems.length === 0) {
      menuGrid.innerHTML = `<div class="no-items-msg"><i class="fas fa-leaf" style="font-size: 2rem; color: var(--color-primary); margin-bottom: 12px; display:block;"></i>No items found matching the filter.</div>`;
      menuGrid.style.opacity = "1";
      return;
    }
    
    filteredItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-card";
      
      const dotType = item.veg ? "veg-dot" : "nonveg-dot";
      const dotLabel = item.veg ? "Veg" : "Non-Veg";
      
      card.innerHTML = `
        <div class="menu-card-img-wrap">
          <img src="${item.image}" alt="${item.name}" class="menu-card-img" onerror="this.onerror=null; this.src='assets/thali.png';">
          <span class="dot-badge">
            <span class="${dotType}"></span> ${dotLabel}
          </span>
        </div>
        <div class="menu-card-content">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.name}</h3>
            <span class="menu-card-price">₹${item.price}</span>
          </div>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-footer">
            <button class="menu-card-add-wa add-to-cart-btn" data-id="${item.id}">
              <i class="fab fa-whatsapp"></i> Add to WhatsApp Order
            </button>
          </div>
        </div>
      `;
      menuGrid.appendChild(card);
    });
    
    // Add Click listeners to "Add to WhatsApp" buttons
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const itemId = btn.getAttribute("data-id");
        addToCart(itemId);
      });
    });
    
    menuGrid.style.opacity = "1";
  }, 200);
}

// Initialize Menu
renderMenu();

// --- WHATSAPP ORDERING CART SYSTEM ---
function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;
  
  const existingCartItem = cart.find(i => i.id === itemId);
  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
  }
  
  updateCartUI();
  
  // Smooth scroll to direct order section to show item added
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

// Specials order click handler
document.querySelectorAll(".add-to-wa-order").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const item = menuItems.find(i => i.name === name);
    if (item) {
      addToCart(item.id);
    }
  });
});

function updateCartUI() {
  if (cart.length === 0) {
    emptyCartMsg.style.display = "block";
    cartItemsList.style.display = "none";
    cartSummary.style.display = "none";
    sendWaOrderBtn.disabled = true;
    return;
  }
  
  emptyCartMsg.style.display = "none";
  cartItemsList.style.display = "block";
  cartSummary.style.display = "flex";
  sendWaOrderBtn.disabled = false;
  
  cartItemsList.innerHTML = "";
  let total = 0;
  
  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    total += itemSubtotal;
    
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justify = "space-between";
    li.style.alignItems = "center";
    li.style.marginBottom = "10px";
    li.style.fontSize = "0.9rem";
    
    li.innerHTML = `
      <div>
        <span style="font-weight: 600;">${item.name}</span> 
        <span style="color: var(--color-gray); margin-left: 6px;">x${item.quantity}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span>₹${itemSubtotal}</span>
        <button class="remove-cart-item-btn" data-index="${index}" style="background: none; border: none; color: var(--color-nonveg); cursor: pointer;" aria-label="Remove item">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
    cartItemsList.appendChild(li);
  });
  
  cartTotalPrice.innerText = `₹${total}`;
  
  // Re-attach remove listeners
  document.querySelectorAll(".remove-cart-item-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"));
      cart.splice(idx, 1);
      updateCartUI();
    });
  });
}

// Send Order on WhatsApp Click
if (sendWaOrderBtn) {
  sendWaOrderBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    
    let orderMsg = `*NEW ORDER - RELISH JODHPUR*\n`;
    orderMsg += `=========================\n\n`;
    
    let total = 0;
    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      orderMsg += `• *${item.name}* (x${item.quantity}) - ₹${subtotal}\n`;
    });
    
    orderMsg += `\n=========================\n`;
    orderMsg += `*Total Amount:* ₹${total}\n\n`;
    orderMsg += `Please verify this order and let me know the estimated delivery time.`;
    
    const encodedMsg = encodeURIComponent(orderMsg);
    const waUrl = `https://wa.me/919876543210?text=${encodedMsg}`;
    
    // Open in new window
    window.open(waUrl, "_blank");
    
    // Clear cart after order submitted
    cart = [];
    updateCartUI();
    
    // Show confirmation Toast
    showSuccessModal("Order Submitted!", "Your order list has been compiled and sent to WhatsApp. Our support executive will confirm the delivery details shortly.");
  });
}

// --- TABLE RESERVATION FORM ---
if (reservationForm) {
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("res-name").value;
    const phone = document.getElementById("res-phone").value;
    const date = document.getElementById("res-date").value;
    const time = document.getElementById("res-time").value;
    const guests = document.getElementById("res-guests").value;
    const request = document.getElementById("res-request").value;
    const notes = document.getElementById("res-comments").value || "None";
    
    // Formatting confirmation message
    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    
    const message = `Dear ${name}, your booking request for ${guests} guests on ${formattedDate} at ${time} is recorded. (Requests: ${request})`;
    
    showSuccessModal("Table Reserved!", message);
    
    // WhatsApp confirmation option
    const waMsg = `*Table Reservation Request*\n` +
                  `==========================\n` +
                  `Name: ${name}\n` +
                  `Phone: ${phone}\n` +
                  `Date: ${date} (${formattedDate})\n` +
                  `Time: ${time}\n` +
                  `Guests: ${guests} Person(s)\n` +
                  `Celebration/Setup: ${request}\n` +
                  `Special Notes: ${notes}\n` +
                  `==========================\n` +
                  `Please confirm my booking.`;
                  
    const doubleConfirmBtn = document.createElement("button");
    doubleConfirmBtn.className = "btn btn-secondary";
    doubleConfirmBtn.style.width = "100%";
    doubleConfirmBtn.style.marginTop = "10px";
    doubleConfirmBtn.innerHTML = `<i class="fab fa-whatsapp"></i> Double Confirm on WhatsApp`;
    
    doubleConfirmBtn.addEventListener("click", () => {
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`, "_blank");
    });
    
    const modalContent = successModal.querySelector(".modal-content");
    // Remove previous double confirm button if any
    const prevBtn = modalContent.querySelector(".btn-secondary");
    if (prevBtn) prevBtn.remove();
    modalContent.insertBefore(doubleConfirmBtn, successModalCloseBtn);
    
    reservationForm.reset();
  });
}

// --- CATERING MODAL & FORM ---
if (openCateringModalBtn) {
  openCateringModalBtn.addEventListener("click", () => {
    cateringModal.classList.add("active");
  });
}

if (closeCateringModalBtn) {
  closeCateringModalBtn.addEventListener("click", () => {
    cateringModal.classList.remove("active");
  });
}

if (cateringForm) {
  cateringForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("cat-name").value;
    const phone = document.getElementById("cat-phone").value;
    const guests = parseInt(document.getElementById("cat-guests").value);
    const date = document.getElementById("cat-date").value;
    const eventType = document.getElementById("cat-event").value;
    
    const selectedCuisines = [];
    document.querySelectorAll("input[name='cuisine']:checked").forEach(cb => {
      selectedCuisines.push(cb.value);
    });
    
    if (selectedCuisines.length === 0) {
      alert("Please select at least one cuisine type!");
      return;
    }
    
    // Estimate Quote calculation
    // Base cost: Rajasthani = ₹300 per plate, North Indian = ₹350 per plate, Chinese = ₹250 per plate.
    let basePricePerPlate = 0;
    if (selectedCuisines.includes("Rajasthani")) basePricePerPlate += 350;
    if (selectedCuisines.includes("North Indian")) basePricePerPlate += 150; // Add-on cost
    if (selectedCuisines.includes("Chinese")) basePricePerPlate += 100; // Add-on cost
    
    if (selectedCuisines.length > 1) {
      // Apply combo package discount
      basePricePerPlate = Math.round(basePricePerPlate * 0.9);
    }
    
    const totalEstimate = basePricePerPlate * guests;
    
    cateringModal.classList.remove("active");
    
    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    
    const modalMsg = `Thank you ${name}! We've received your request for a ${eventType} for ${guests} guests on ${formattedDate}.\n\n*Estimated Quote:* ₹${totalEstimate.toLocaleString("en-IN")} (Approx. ₹${basePricePerPlate}/plate)`;
    showSuccessModal("Quote Estimated!", modalMsg);
    
    // WhatsApp Enquiry option
    const waMsg = `*Catering Enquiry Quote Request*\n` +
                  `==============================\n` +
                  `Client Name: ${name}\n` +
                  `Phone Number: ${phone}\n` +
                  `Approx Guests: ${guests}\n` +
                  `Event Date: ${date} (${formattedDate})\n` +
                  `Event Type: ${eventType}\n` +
                  `Cuisines: ${selectedCuisines.join(", ")}\n` +
                  `Est. Price Plate: ₹${basePricePerPlate}\n` +
                  `Total Estimated Quote: ₹${totalEstimate.toLocaleString("en-IN")}\n` +
                  `==============================\n` +
                  `Please get in touch with me with a customized catering menu.`;
                  
    const catWaBtn = document.createElement("button");
    catWaBtn.className = "btn btn-secondary";
    catWaBtn.style.width = "100%";
    catWaBtn.style.marginTop = "10px";
    catWaBtn.innerHTML = `<i class="fab fa-whatsapp"></i> Chat Catering Manager`;
    
    catWaBtn.addEventListener("click", () => {
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`, "_blank");
    });
    
    const modalContent = successModal.querySelector(".modal-content");
    const prevBtn = modalContent.querySelector(".btn-secondary");
    if (prevBtn) prevBtn.remove();
    modalContent.insertBefore(catWaBtn, successModalCloseBtn);
    
    cateringForm.reset();
  });
}

// --- SUCCESS MODAL MANAGER ---
function showSuccessModal(title, message) {
  successModalTitle.innerText = title;
  successModalMessage.innerText = message;
  successModal.classList.add("active");
}

if (successModalCloseBtn) {
  successModalCloseBtn.addEventListener("click", () => {
    successModal.classList.remove("active");
    // Clean up WhatsApp double confirm buttons if generated
    const modalContent = successModal.querySelector(".modal-content");
    const optBtn = modalContent.querySelector(".btn-secondary");
    if (optBtn) optBtn.remove();
  });
}

// --- LIGHTBOX GALLERY ---
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector(".gallery-img");
    const title = item.querySelector(".gallery-overlay h4").innerText;
    const category = item.querySelector(".gallery-overlay p").innerText;
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.innerHTML = `<strong>${title}</strong> - <span style="color: var(--color-gold);">${category}</span>`;
    lightbox.classList.add("active");
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}

// --- CUSTOMER REVIEWS CAROUSEL ---
function initReviewsSlider() {
  if (!reviewsTrack || reviewSlides.length === 0) return;
  
  // Create navigation dots
  reviewsDotsContainer.innerHTML = "";
  reviewSlides.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.className = `dot ${idx === 0 ? "active" : ""}`;
    dot.setAttribute("data-index", idx);
    dot.addEventListener("click", () => {
      goToReview(idx);
      resetReviewAutoPlay();
    });
    reviewsDotsContainer.appendChild(dot);
  });
  
  reviewPrevBtn.addEventListener("click", () => {
    prevReview();
    resetReviewAutoPlay();
  });
  
  reviewNextBtn.addEventListener("click", () => {
    nextReview();
    resetReviewAutoPlay();
  });
  
  startReviewAutoPlay();
}

function updateReviewSlider() {
  reviewsTrack.style.transform = `translateX(-${currentReviewIndex * 100}%)`;
  
  // Update dots
  const dots = reviewsDotsContainer.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentReviewIndex]) {
    dots[currentReviewIndex].classList.add("active");
  }
}

function nextReview() {
  currentReviewIndex = (currentReviewIndex + 1) % reviewSlides.length;
  updateReviewSlider();
}

function prevReview() {
  currentReviewIndex = (currentReviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
  updateReviewSlider();
}

function goToReview(idx) {
  currentReviewIndex = idx;
  updateReviewSlider();
}

function startReviewAutoPlay() {
  reviewAutoPlayInterval = setInterval(nextReview, 5000);
}

function resetReviewAutoPlay() {
  clearInterval(reviewAutoPlayInterval);
  startReviewAutoPlay();
}

// Initialize Reviews
initReviewsSlider();
