const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Admin (Hash for 'password123')
  // For simplicity and quick local development, we use a simple SHA256-like hash or clear identifier.
  // We'll match this in our authentication logic.
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      passwordHash: "123456", // Securely handled in auth logic
      role: "SUPER_ADMIN",
    },
  });
  console.log("Admin account created:", admin.username);

  // 2. Create Default Settings
  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      companyName: "Indian Black Panther Security Services",
      phoneNumber: "9845209643",
      emergencyPhone: "9845209643",
      email: "info@ibpss.in",
      address: "Office Number 56, Shravan Deep Apartment, 4th Floor, High Court Colony Road, Near Residency Hotel, Ratanada Road, Jodhpur - 342011",
      whatsappNumber: "9845209643",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      twitterUrl: "https://twitter.com",
      linkedinUrl: "https://linkedin.com",
      seoTitle: "Indian Black Panther Security Services | Elite Security Solutions",
      seoDescription: "Elite Security Solutions With Highly Trained Guards, Professional Bouncers, Armed Gunmen & Personal Security Officers.",
    },
  });
  console.log("Default settings created.");

  // 3. Create Default Services
  const services = [
    {
      name: "Security Guards",
      slug: "security-guards",
      icon: "Shield",
      shortDescription: "Professional and disciplined manpower security for residential, commercial, and industrial spaces.",
      longDescription: "Our security guards are recruited through a stringent vetting process, undergo extensive physical and mental training, and maintain the highest standard of discipline. We provide security for residential complexes, IT parks, retail showrooms, corporate offices, and heavy industries.",
      features: "Background Verified | 24/7 Patrol Monitoring | First-Aid Trained | Uniformed & Disciplined",
      benefits: "Prevent unauthorized entry | Rapid incident resolution | Regular security audits | Complete peace of mind",
      category: "MANPOWER",
      image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=800",
    },
    {
      name: "Professional Bouncers",
      slug: "professional-bouncers",
      icon: "Users",
      shortDescription: "Highly trained bouncers for clubs, private events, weddings, and VIP functions.",
      longDescription: "Our bouncers are selected based on physique, temperament, and crisis management capabilities. Trained in de-escalation tactics, crowd control, and emergency response, they ensure events remain safe and private gatherings proceed without disruption.",
      features: "Stature & Tactical Physique | Verbal De-escalation Experts | Event Crowd Management | Event Access Auditing",
      benefits: "Maintain event decorum | Control gate entry professionally | Immediate response to disruptions | High presence deterrence",
      category: "EVENT",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800",
    },
    {
      name: "Gunman Services",
      slug: "gunman-services",
      icon: "ShieldAlert",
      shortDescription: "Licensed and trained armed security personnel for high-risk protection.",
      longDescription: "We provide highly disciplined armed gunman security officers with valid government-issued licenses. Ideal for high-risk environments, banks, cash logistics, private asset transport, and personal protection, our gunmen are trained in defensive shooting and threat prevention.",
      features: "Valid Firearm Licensing | High-Vigilance Training | Ex-Servicemen Recruitments | Threat Assessment Profile",
      benefits: "Definitive defense against armed threats | Safe transit of valuables | VIP protection under threat | Highly visible deterrence",
      category: "MANPOWER",
      image: "https://images.unsplash.com/photo-1508847154043-be12a26c86c1?q=80&w=800",
    },
    {
      name: "Personal Security Officer (PSO)",
      slug: "pso-services",
      icon: "UserCheck",
      shortDescription: "Personal bodyguard services for VIPs, executives, and individuals requiring personal protection.",
      longDescription: "Our Personal Security Officers (PSOs) include ex-military, ex-special forces, and elite trained bodyguards. They provide unobtrusive, highly vigilant executive protection, transport security, and risk analysis for VIPs, celebrities, corporate leaders, and politicians.",
      features: "Tactical Driving Skills | Ex-Special Forces Personnel | Unobtrusive Surveillance | Defensive Formations",
      benefits: "Customized travel risk planning | High-grade physical protection | Discretion and confidentiality | Multi-layered defense",
      category: "VIP",
      image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800",
    },
    {
      name: "Event Security",
      slug: "event-security",
      icon: "Calendar",
      shortDescription: "Complete crowd management, access control, and event safety solutions.",
      longDescription: "From high-profile corporate summits, massive concerts, and weddings, to private VIP events, our team handles logistics, perimeter control, VIP escorts, emergency evacuations, and crowd dynamics planning.",
      features: "CCTV Monitoring Coordination | Perimeter Patrolling | Metal Detector Access Control | Emergency Evacuation Mapping",
      benefits: "Seamless event operations | VIP guest management | Zero tolerance for gatecrashers | Medical response integration",
      category: "EVENT",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log("Services seeded.");

  // 4. Create Default Blogs
  const blogs = [
    {
      title: "Essential Security Tips for Corporate Offices",
      slug: "essential-security-tips-corporate-offices",
      excerpt: "Learn the primary measures that corporate offices must take to prevent unauthorized access and secure intellectual property.",
      content: "<p>Corporate office security is no longer just about hiring a guard at the door. In today's landscape, physical security and cyber security must go hand in hand. In this article, we cover 5 key guidelines to secure your office premises, establish rigorous visitor access controls, perform regular emergency drill training, and integrate modern CCTV surveillance with round-the-clock physical patrols.</p><p>We recommend establishing strict entry passes, dividing building access based on clearance levels, and ensuring that all security personnel undergo mock drills at least once a quarter to maintain sharp reflexes.</p>",
      category: "Security Tips",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    },
    {
      title: "Planning Security for High-Profile Private Events",
      slug: "planning-security-high-profile-events",
      excerpt: "A comprehensive checklist for event planners to ensure VIP safety, seamless entry protocols, and crowd control management.",
      content: "<p>High-profile events require meticulous coordination between organizers and the security squad. Access management starts long before the guests arrive, with perimeter sweeps, security audits, and coordination with local authorities.</p><p>Using bouncers to maintain decorum combined with metal detectors and physical validation of digital invitations helps streamline VIP access. Emergency exits must be mapped out, and a designated quick-response team should be standing by to neutralize any threat immediately.</p>",
      category: "Event Safety",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
    },
    {
      title: "The Role of PSOs in Executive Protection",
      slug: "role-of-pso-executive-protection",
      excerpt: "How Personal Security Officers analyze threat vectors to safeguard high-net-worth individuals and corporate VIPs.",
      content: "<p>Executive protection is less about reaction and more about active planning and prevention. An elite Personal Security Officer (PSO) works silently to assess threat environments, plan secure routes, prepare escape routes, and identify weak spots in transit or event venues.</p><p>Our PSOs are trained in defensive maneuvers, tactical first-aid, and conflict de-escalation to ensure they protect the client's safety while maintaining the utmost discretion and professional etiquette.</p>",
      category: "Personal Protection",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
    },
  ];

  for (const blog of blogs) {
    await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: {},
      create: blog,
    });
  }
  console.log("Blogs seeded.");

  // 5. Create Default Testimonials
  const testimonials = [
    {
      clientName: "Rajesh Singhania",
      company: "Singhania Group of Industries",
      rating: 5,
      feedback: "Indian Black Panther Security Services has transformed our factory security. Their guards are disciplined, punctual, and highly professional. Highly recommended!",
      clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    },
    {
      clientName: "Meera Sen",
      company: "Glow Events & Exhibitions",
      rating: 5,
      feedback: "We hired 40 bouncers and access control officers for our luxury fashion summit. The event went perfectly. Their crew was polite but firm in managing the crowd.",
      clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    },
    {
      clientName: "Vikram Rathore",
      company: "Rathore Heritage Hotels",
      rating: 5,
      feedback: "Their PSOs provided elite security for our VIP international guests. The level of vigilance, defensive driving skills, and discretion was outstanding.",
      clientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }
  console.log("Testimonials seeded.");

  // 6. Create Default Gallery Items
  const galleryItems = [
    { title: "Armed Gunman Protection", category: "GUARDS", url: "https://images.unsplash.com/photo-1508847154043-be12a26c86c1?q=80&w=800" },
    { title: "Elite Guards Guarding Corporate Building", category: "GUARDS", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
    { title: "VIP Close Protection PSO Escort", category: "VIP", url: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800" },
    { title: "High-Profile Event Bouncers Standalone", category: "BOUNCERS", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800" },
    { title: "Tactical Defensive Formations Training", category: "TRAINING", url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" },
    { title: "Elite Event Crowds Access Control Management", category: "EVENTS", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800" },
  ];

  for (const item of galleryItems) {
    await prisma.galleryItem.create({
      data: item,
    });
  }
  console.log("Gallery seeded.");

  // 7. Create Client Logos
  const clientLogos = [
    { name: "Reliance Industries", imageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=150" },
    { name: "Taj Hotels", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=150" },
    { name: "Fortis Healthcare", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=150" },
    { name: "HDFC Bank", imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=150" },
  ];

  for (const logo of clientLogos) {
    await prisma.clientLogo.create({
      data: logo,
    });
  }
  console.log("Client logos seeded.");

  // 8. Create Job Openings
  const jobOpenings = [
    { title: "Manpower Security Guard", department: "Operations", description: "Vigilant, disciplined security guards for corporate and industrial locations.", requirements: "Height: 5'8\" or above\nEducation: 10th pass minimum\nClean criminal record\nDisciplined military/police background preferred", type: "Full-Time", location: "Jodhpur / Jaipur" },
    { title: "Professional Event Bouncer", department: "Elite Protection", description: "Bouncers for luxury events, weddings, club security, and high-profile visits.", requirements: "Height: 6'0\" or above\nRobust tactical build\nStrong de-escalation communication\nExperience of 2+ years", type: "Contract", location: "Jodhpur / Udaipur" },
    { title: "Armed Gunman (Licensed)", department: "Tactical Defense", description: "Licensed armed security guards for cash transits, bank vault duties, and private transport.", requirements: "Valid Retained Arms License (All India / State)\nEx-servicemen preferred\nHigh level of tactical firearm handling\nClean service records", type: "Full-Time", location: "Jodhpur" },
    { title: "Personal Security Officer (PSO)", department: "VIP Protection", description: "Elite bodyguards for VIPs, executives, politicians, and high-net-worth clients.", requirements: "Ex-Special Forces (NSG, Para Commandos, Marcos) or Elite CRPF\nHigh security clearance\nFluent in Hindi and English\nExpert in close quarters protection", type: "Full-Time", location: "Pan India Travel" },
  ];

  for (const opening of jobOpenings) {
    await prisma.jobOpening.create({
      data: opening,
    });
  }
  console.log("Job openings seeded.");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
