import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up directories
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded media
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif|mp4|mov|avi|webm/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images and videos are allowed!'));
  }
});

// Database path
const DB_PATH = path.join(__dirname, 'db.json');

// Default seeding data
const defaultDb = {
  settings: {
    companyName: "RS Music Event",
    contactPhone: "+91 77424 26653",
    contactEmail: "info@rsmusicevent.com",
    address: "RS Music Event, Near MS Hospital, Bhagat Ki Kothi, Jodhpur – 342013",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.4326164522964!2d73.00696137577174!3d26.24765917705126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c3ef5d72f13%3A0xe54fb1d2b7d5fa2c!2sBhagat%20Ki%20Kothi%2C%20Jodhpur%2C%20Rajasthan%20342001!5e0!3m2!1sen!2sin!4v1718600000000!5m2!1sen!2sin",
    instagramUrl: "https://instagram.com/rsmusicevent",
    facebookUrl: "https://facebook.com/rsmusicevent",
    youtubeUrl: "https://youtube.com/rsmusicevent",
    whatsappNumber: "917742426653",
    metaTitle: "RS Music Event - Premium Luxury Wedding & Event Management in Jodhpur",
    metaDesc: "Turning celebrations into lifetime memories. RS Music Event offers luxury weddings, live sound, DJ performance, sangeet, and corporate event management in Rajasthan.",
    primaryColor: "#5B0F17", // Royal Maroon
    secondaryColor: "#7A1E2C", // Deep Burgundy
    accentColor: "#D4AF37", // Royal Gold
    backgroundColor: "#FFF8E7", // Ivory White
    darkColor: "#0B0B0B" // Rich Black
  },
  hero: {
    headline: "Turning Celebrations Into Lifetime Memories",
    subheading: "RS Music Event brings creativity, luxury, and perfection to weddings, musical nights, corporate events, and grand celebrations.",
    ctaPrimary: "Plan Your Event",
    ctaSecondary: "Call Now",
    bgVideoUrl: "",
    bgImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
  },
  stats: [
    { label: "Events Organized", value: "500+", id: "stat-1" },
    { label: "Happy Guests", value: "1000+", id: "stat-2" },
    { label: "Premium Venues", value: "50+", id: "stat-3" },
    { label: "Years of Experience", value: "10+", id: "stat-4" }
  ],
  services: [
    {
      id: "wedding",
      title: "Wedding Management",
      desc: "Complete planning and execution of traditional and modern Indian weddings.",
      highlights: ["Royal themes & decor", "Mandap & stage setups", "Baraat planning", "Guest hospitality"],
      benefits: ["Stress-free planning", "Authentic rituals styling", "Curated vendor access"],
      imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069"
    },
    {
      id: "sangeet",
      title: "Sangeet & Musical Nights",
      desc: "Professional sound, lights, stage, and entertainment arrangements.",
      highlights: ["Choreography setups", "Visual LED walls", "Live band integration", "Themed backdrops"],
      benefits: ["High energy atmosphere", "Impeccable acoustics", "Flawless choreography sync"],
      imageUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=2070"
    },
    {
      id: "dj",
      title: "DJ & Live Performances",
      desc: "Energetic performances with premium audio and visual experiences.",
      highlights: ["Celebrity DJs", "Intelligent light shows", "Custom sound rigs", "Laser shows"],
      benefits: ["Unmatched party vibe", "State of the art sound", "Interactive playlists"],
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070"
    },
    {
      id: "decor",
      title: "Decoration & Theme Design",
      desc: "Luxury floral arrangements, stage decoration, and customized themes.",
      highlights: ["Fresh flower styling", "Royal Jaali setups", "Golden pillars & drapery", "Lighting integration"],
      benefits: ["Bespoke mood boarding", "Royal heritage aesthetic", "High density floral setups"],
      imageUrl: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=2070"
    },
    {
      id: "corporate",
      title: "Corporate Events",
      desc: "Professional conferences, product launches, and business celebrations.",
      highlights: ["Audio-visual setups", "Stage & podium design", "Branding structures", "Delegate management"],
      benefits: ["Flawless execution", "Professional brand representation", "Timely schedules"],
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069"
    },
    {
      id: "private",
      title: "Birthday & Private Parties",
      desc: "Creative themes and memorable celebrations.",
      highlights: ["Kids & adult themes", "Sound & lighting setups", "Entertainment acts", "Catering assistance"],
      benefits: ["Bespoke concepts", "Memorable family moments", "Total coordinator care"],
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070"
    }
  ],
  weddings: {
    preWedding: [
      { name: "Haldi Ceremony", desc: "Golden marigold themes, traditional music, and elegant outdoor setups with splash areas.", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000" },
      { name: "Mehendi Ceremony", desc: "Royal seating, colorful drapes, traditional crafts stalls, and live folk singers.", imageUrl: "https://images.unsplash.com/photo-1590075865003-e48277faa558?q=80&w=1000" },
      { name: "Engagement & Ring Ceremony", desc: "Glossy stage design, premium lighting, romantic flower installations, and instrumental background music.", imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000" }
    ],
    mainWedding: [
      { name: "Baraat Management", desc: "Royal vintage cars, baggi/chariot, traditional dhol players, brass bands, and custom fireworks.", imageUrl: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1000" },
      { name: "Varmala & Stage Setup", desc: "3D hydraulic stages, dry ice smoke effects, rose petal showers, and golden palace theme backdrops.", imageUrl: "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?q=80&w=1000" },
      { name: "Mandap & Floral Decoration", desc: "Traditional Vedic styles, dome setups with crystal chandeliers, jasmine & royal red rose wraps.", imageUrl: "https://images.unsplash.com/photo-1519225495810-7512c696af0a?q=80&w=1000" }
    ],
    postWedding: [
      { name: "Grand Reception", desc: "Black-tie elegance, live orchestration, gourmet banquet management, and LED visual mapping.", imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000" },
      { name: "Couple Entry", desc: "Cold pyros, laser paths, aerial entry rigs, and spotlight tracking.", imageUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1000" }
    ]
  },
  corporates: [
    { title: "Business Conferences", desc: "High-definition projection screens, premium sound arrays, podiums, and comfortable delegate arrangements.", imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000" },
    { title: "Award Functions", desc: "Red carpet setup, dramatic entry lighting, high-quality audio rigs, custom backdrops, and trophy presentation panels.", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000" },
    { title: "Product Launches", desc: "Creative reveal mechanisms, customized lighting dynamics, laser mapping, and media wall setup.", imageUrl: "https://images.unsplash.com/photo-1505232458627-a7272640408a?q=80&w=1000" },
    { title: "Annual Corporate Gala", desc: "Live music bands, gala dining setups, team-building spaces, and celebratory themed decorations.", imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000" }
  ],
  gallery: [
    { id: "gal-1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000", type: "image", category: "Weddings" },
    { id: "gal-2", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000", type: "image", category: "Weddings" },
    { id: "gal-3", url: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000", type: "image", category: "Sangeet" },
    { id: "gal-4", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000", type: "image", category: "DJ Nights" },
    { id: "gal-5", url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1000", type: "image", category: "Decoration" },
    { id: "gal-6", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000", type: "image", category: "Corporate Events" },
    { id: "gal-7", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000", type: "image", category: "Concerts" },
    { id: "gal-8", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000", type: "image", category: "DJ Nights" }
  ],
  partners: [
    { id: "part-1", name: "Taj Hotels Jodhpur", logoUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=200" },
    { id: "part-2", name: "Umaid Bhawan Palace", logoUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=200" },
    { id: "part-3", name: "Radisson Events", logoUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=200" },
    { id: "part-4", name: "ITC Rajputana", logoUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=200" },
    { id: "part-5", name: "Marriott Jodhpur", logoUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=200" }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Rajesh & Meera Sharma",
      eventType: "Royal Wedding",
      rating: 5,
      text: "RS Music Event made our dream wedding come true. The grand stage setup, hydraulic entry, and perfect sound system left all our 800+ guests in awe. Wasim and his team planned everything perfectly!",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400"
    },
    {
      id: "test-2",
      name: "Amit Singhal (CEO, TechGen)",
      eventType: "Annual Corporate Gala",
      rating: 5,
      text: "Outstanding professionalism! The AV mapping, seamless stage flow, and corporate lighting setup were extremely premium. RS Music Event is our official event partner now.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
    },
    {
      id: "test-3",
      name: "Priyanka Sen",
      eventType: "Grand Sangeet & DJ Night",
      rating: 5,
      text: "The audio-visual setup for my Sangeet was unmatched. The DJ kept the crowd on the dance floor until 3 AM! The golden lighting and particle effects created a royal festival feel.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
    }
  ],
  packages: [
    {
      id: "pkg-1",
      name: "Silver Celebration",
      price: "₹1,50,000",
      duration: "Single Event",
      features: [
        "Standard Sound System (2 Top Speakers)",
        "Basic LED Stage Wash Lights",
        "Entry & Stage Floral Border Decor",
        "1 Event Manager Coordination",
        "Classic DJ Performance",
        "Inquiry support"
      ],
      isPopular: false
    },
    {
      id: "pkg-2",
      name: "Gold Royal Package",
      price: "₹3,50,000",
      duration: "Sangeet & Wedding (2 Days)",
      features: [
        "Premium Sound Array (4 Tops, 2 Bass Subwoofers)",
        "Moving Head Truss Intelligent Lighting",
        "Complete Mandap & Stage Floral Theme Setup",
        "Haldi & Mehendi Setup Decorations",
        "Professional Sangeet DJ & Anchoring",
        "2 Dedicated Event Coordinators",
        "Cold Pyro Cold Fireworks Entry"
      ],
      isPopular: true
    },
    {
      id: "pkg-3",
      name: "Platinum Maharaja Experience",
      price: "₹7,50,000",
      duration: "Complete Wedding Festivities (3 Days)",
      features: [
        "Maharaja Theme Stage & Hydraulic Varmala Setup",
        "High-End JBL/L-Acoustics Sound System",
        "Indoor & Outdoor Venue Floral Sculpting",
        "Professional Folk Dancers & Live Band Performance",
        "Full LED Wall Background (16x10 feet) for Sangeet",
        "Premium Baraat Management with baggi & dhol groups",
        "Drone Shoot & Professional Event Photography Assist",
        "Dedicated VIP Guest Hospitality Desk (4 Team Members)",
        "Dry Ice Smoke & Laser mapping"
      ],
      isPopular: false
    }
  ],
  bookings: [
    {
      id: "bk-1",
      name: "Vikram Rathore",
      phone: "+91 98765 43210",
      email: "vikram@example.com",
      eventType: "Wedding",
      date: "2026-11-12",
      guests: "600",
      packageSelected: "Gold Royal Package",
      message: "Looking for a grand Rajputana royal style wedding setup at Jodhpur. Please call me.",
      status: "Discussing",
      createdAt: "2026-06-17T11:20:00.000Z",
      notes: "Client wants custom vintage cars for Baraat entry."
    },
    {
      id: "bk-2",
      name: "Sanjay Mehta",
      phone: "+91 88776 65544",
      email: "sanjay@mehtacorp.com",
      eventType: "Corporate",
      date: "2026-08-05",
      guests: "250",
      packageSelected: "Silver Celebration",
      message: "Annual awards ceremony. Require clear sound, LED wall display, and simple branding backdrops.",
      status: "New",
      createdAt: "2026-06-17T15:45:00.000Z",
      notes: ""
    }
  ],
  blogs: [
    {
      id: "blog-1",
      title: "5 Secrets to Planning a Royal Rajasthani Wedding",
      desc: "Planning a destination wedding in Jodhpur or Udaipur? Here are the critical styling tips, lighting setups, and heritage venue highlights to create a royal experience.",
      content: "Indian weddings are known for their grandeur, but a Rajasthani royal wedding is on a whole other level. To achieve this, focus on: 1. Color harmony with Royal Maroon and Gold. 2. Traditional Jaali backdrops. 3. Dramatic lighting highlighting historical architecture. 4. Traditional welcoming with dhol and rose petal showers. 5. Experiential Rajasthani dining structures.",
      date: "2026-06-15",
      author: "Wasim"
    },
    {
      id: "blog-2",
      title: "Why Sound and Acoustics Can Make or Break Your Sangeet",
      desc: "Ever been to a sangeet where the bass was muddy or the echo was unbearable? Explore the technical sound engineering choices that guarantee crystal clear performances.",
      content: "Sound is not just about volume; it is about distribution and clarity. For high-energy events like Sangeet nights, you need premium acoustic arrays placed strategically. Heavy bass setups are needed for DJ beats, but clear mids and highs are crucial for anchors and singers. Always ensure your sound planner conducts sound-checks 3 hours before the event.",
      date: "2026-06-10",
      author: "Wasim"
    }
  ],
  faqs: [
    { id: "faq-1", question: "Do you plan destination weddings outside Jodhpur?", answer: "Yes! While we are based in Jodhpur, we organize and manage weddings and events all across Rajasthan (including Udaipur, Jaipur, Jaisalmer) and major cities in India." },
    { id: "faq-2", question: "Can we customize the services in the packages?", answer: "Absolutely! Our packages are fully customizable. We can modify decoration themes, sound capacities, or add specific live performances based on your budget and vision." },
    { id: "faq-3", question: "How early should we book RS Music Event?", answer: "For grand weddings and peak season events (November to March), we recommend booking at least 3 to 6 months in advance to secure premium venues, equipment, and artists." },
    { id: "faq-4", question: "Do you arrange celebrity singers and DJs?", answer: "Yes. We have direct collaborations with top Bollywood singers, Punjabi artists, folk performers, and celebrity DJs to make your musical nights spectacular." }
  ],
  logs: [
    { action: "System initialized", timestamp: "2026-06-17T11:50:00.000Z", user: "System" }
  ]
};

// Helper database reader/writer
function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf-8');
      return defaultDb;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Database reading error, using defaults:", error);
    return defaultDb;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Database writing error:", error);
    return false;
  }
}

// Log actions
function addLog(action, user = "Wasim") {
  const db = readDb();
  db.logs.unshift({
    action,
    timestamp: new Date().toISOString(),
    user
  });
  // Keep last 100 logs
  if (db.logs.length > 100) {
    db.logs = db.logs.slice(0, 100);
  }
  writeDb(db);
}

// API Routes

// Content Management
app.get('/api/content', (req, res) => {
  const db = readDb();
  res.json(db);
});

app.post('/api/content', (req, res) => {
  const db = readDb();
  const { settings, hero, stats, services, weddings, corporates, testimonials, packages, blogs, faqs } = req.body;
  
  if (settings) db.settings = { ...db.settings, ...settings };
  if (hero) db.hero = { ...db.hero, ...hero };
  if (stats) db.stats = stats;
  if (services) db.services = services;
  if (weddings) db.weddings = weddings;
  if (corporates) db.corporates = corporates;
  if (testimonials) db.testimonials = testimonials;
  if (packages) db.packages = packages;
  if (blogs) db.blogs = blogs;
  if (faqs) db.faqs = faqs;
  
  if (writeDb(db)) {
    addLog("Updated website content configuration");
    res.json({ success: true, message: "Content updated successfully!" });
  } else {
    res.status(500).json({ error: "Failed to write database updates." });
  }
});

// Bookings
app.get('/api/bookings', (req, res) => {
  const db = readDb();
  res.json(db.bookings);
});

app.post('/api/bookings', (req, res) => {
  const db = readDb();
  const newBooking = {
    id: 'bk-' + Date.now(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email || "",
    eventType: req.body.eventType || "Wedding",
    date: req.body.date || "",
    guests: req.body.guests || "0",
    packageSelected: req.body.packageSelected || "Custom Planning",
    message: req.body.message || "",
    status: "New",
    createdAt: new Date().toISOString(),
    notes: ""
  };
  
  db.bookings.unshift(newBooking);
  if (writeDb(db)) {
    addLog(`New booking inquiry received from ${newBooking.name}`);
    res.json({ success: true, booking: newBooking });
  } else {
    res.status(500).json({ error: "Failed to submit booking." });
  }
});

app.put('/api/bookings/:id', (req, res) => {
  const db = readDb();
  const bookingIndex = db.bookings.findIndex(b => b.id === req.params.id);
  if (bookingIndex === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }
  
  const original = db.bookings[bookingIndex];
  db.bookings[bookingIndex] = {
    ...original,
    status: req.body.status || original.status,
    notes: req.body.notes !== undefined ? req.body.notes : original.notes
  };
  
  if (writeDb(db)) {
    addLog(`Updated status/notes for booking ${original.name} to ${db.bookings[bookingIndex].status}`);
    res.json({ success: true, booking: db.bookings[bookingIndex] });
  } else {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

app.delete('/api/bookings/:id', (req, res) => {
  const db = readDb();
  const booking = db.bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  
  db.bookings = db.bookings.filter(b => b.id !== req.params.id);
  if (writeDb(db)) {
    addLog(`Deleted booking inquiry from ${booking.name}`);
    res.json({ success: true, message: "Booking deleted" });
  } else {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// Gallery API
app.get('/api/gallery', (req, res) => {
  const db = readDb();
  res.json(db.gallery);
});

app.post('/api/gallery', (req, res) => {
  const db = readDb();
  const newMedia = {
    id: 'gal-' + Date.now(),
    url: req.body.url,
    type: req.body.type || 'image',
    category: req.body.category || 'Weddings'
  };
  db.gallery.unshift(newMedia);
  if (writeDb(db)) {
    addLog(`Added new media to gallery category: ${newMedia.category}`);
    res.json({ success: true, item: newMedia });
  } else {
    res.status(500).json({ error: "Failed to save gallery item" });
  }
});

app.delete('/api/gallery/:id', (req, res) => {
  const db = readDb();
  db.gallery = db.gallery.filter(g => g.id !== req.params.id);
  if (writeDb(db)) {
    addLog(`Deleted gallery item ${req.params.id}`);
    res.json({ success: true, message: "Gallery item deleted" });
  } else {
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});

// Partner Log Logos
app.post('/api/partners', (req, res) => {
  const db = readDb();
  const partner = {
    id: 'part-' + Date.now(),
    name: req.body.name,
    logoUrl: req.body.logoUrl
  };
  db.partners.push(partner);
  if (writeDb(db)) {
    addLog(`Added partner brand: ${partner.name}`);
    res.json({ success: true, partner });
  } else {
    res.status(500).json({ error: "Failed to save partner" });
  }
});

app.delete('/api/partners/:id', (req, res) => {
  const db = readDb();
  db.partners = db.partners.filter(p => p.id !== req.params.id);
  if (writeDb(db)) {
    addLog(`Deleted partner brand ${req.params.id}`);
    res.json({ success: true, message: "Partner deleted" });
  } else {
    res.status(500).json({ error: "Failed to delete partner" });
  }
});

// Media Library Upload Router
app.get('/api/media', (req, res) => {
  // Return list of files in uploads folder
  try {
    const files = fs.readdirSync(UPLOADS_DIR);
    const mediaList = files.map(file => {
      const filePath = path.join(UPLOADS_DIR, file);
      const stat = fs.statSync(filePath);
      const ext = path.extname(file).toLowerCase();
      const isVideo = ['.mp4', '.mov', '.avi', '.webm'].includes(ext);
      return {
        filename: file,
        url: `/uploads/${file}`,
        sizeBytes: stat.size,
        uploadedAt: stat.mtime,
        type: isVideo ? 'video' : 'image'
      };
    });
    res.json(mediaList);
  } catch (err) {
    res.status(500).json({ error: "Failed to list media library files" });
  }
});

app.post('/api/media/upload', upload.single('mediaFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file" });
  }
  
  const ext = path.extname(req.file.filename).toLowerCase();
  const isVideo = ['.mp4', '.mov', '.avi', '.webm'].includes(ext);
  
  const uploadedFile = {
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    sizeBytes: req.file.size,
    uploadedAt: new Date(),
    type: isVideo ? 'video' : 'image'
  };
  
  addLog(`Uploaded media file ${req.file.filename} to Media Library`);
  res.json({ success: true, file: uploadedFile });
});

app.delete('/api/media/:filename', (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }
  
  try {
    fs.unlinkSync(filePath);
    addLog(`Deleted file ${req.params.filename} from Media Library`);
    res.json({ success: true, message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// Admin Authentication
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Simple plain authentication matching requirements for Wasim
  if (username === "wasim" && password === "royaljodhpur") {
    addLog("Admin Wasim logged in successfully", "wasim");
    res.json({ success: true, token: "session_token_wasim_admin_rs_music", user: "Wasim" });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// DB Backups & Logs
app.get('/api/logs', (req, res) => {
  const db = readDb();
  res.json(db.logs);
});

app.post('/api/backup', (req, res) => {
  try {
    const backupFilename = `db_backup_${Date.now()}.json`;
    const backupPath = path.join(__dirname, backupFilename);
    const db = readDb();
    fs.writeFileSync(backupPath, JSON.stringify(db, null, 2), 'utf-8');
    addLog("System backup generated");
    res.json({ success: true, filename: backupFilename, message: "Backup successful!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate backup" });
  }
});

// Serve frontend build in production
const frontendBuildPath = path.join(__dirname, '../dist');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// Seed the DB at server start
readDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
