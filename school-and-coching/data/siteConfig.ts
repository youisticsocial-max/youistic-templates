export const siteConfig = {
  name: "{{CLINIC_NAME}}",
  tagline: "Shaping Tomorrow's Leaders Today",
  type: "School & Coaching Institute",
  established: 2005,
  affiliatedBoard: "CBSE",
  affiliationNumber: "CBSE/AFF/2305/2005-06",
  trustName: "{{CLINIC_NAME}}",
  registrationNumber: "REG/EDU/2004/1287",

  principal: {
    name: "Dr. Rajendra Kumar Sharma",
    qualification: "M.Ed., Ph.D. (Education)",
    photo: "/images/principal.jpg",
  },

  contact: {
    phone: "+91 {{PHONE}}",
    whatsapp: "+91 {{PHONE}}",
    email: "{{EMAIL}}",
    admissionEmail: "{{EMAIL}}",
    address:
      "123, Knowledge Park, Sector 15, Near Central Mall, Jaipur, Rajasthan - 302017",
    city: "Jaipur",
    state: "Rajasthan",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.674!2d75.787!3d26.912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQzLjIiTiA3NcKwNDcnMTMuMiJF!5e0!3m2!1sen!2sin!4v1",
  },

  social: {
    facebook: "https://facebook.com/{{CLINIC_NAME}}academy",
    instagram: "https://instagram.com/{{CLINIC_NAME}}academy",
    twitter: "https://twitter.com/{{CLINIC_NAME}}academy",
    youtube: "https://youtube.com/@{{CLINIC_NAME}}academy",
    linkedin: "https://linkedin.com/company/{{CLINIC_NAME}}academy",
  },

  admissionYear: "2025-26",
  admissionOpen: true,

  stats: {
    totalStudents: 1900,
    totalCourses: 500,
    skilledFaculty: 750,
    awards: 30,
    yearsExperience: 20,
    successRate: 98,
  },

  busRoutes: [
    { route: "Route 1", areas: "Malviya Nagar → Jagatpura → Academy", timing: "7:00 AM" },
    { route: "Route 2", areas: "Mansarovar → Pratap Nagar → Academy", timing: "7:15 AM" },
    { route: "Route 3", areas: "Vaishali Nagar → C-Scheme → Academy", timing: "7:00 AM" },
    { route: "Route 4", areas: "Tonk Road → Durgapura → Academy", timing: "7:30 AM" },
    { route: "Route 5", areas: "Ajmer Road → Sodala → Academy", timing: "7:10 AM" },
  ],

  scholarships: [
    {
      name: "Merit Scholarship",
      eligibility: "Above 90% in previous exam",
      benefit: "Up to 50% tuition fee waiver",
    },
    {
      name: "Sports Scholarship",
      eligibility: "State/National level players",
      benefit: "Up to 30% tuition fee waiver",
    },
    {
      name: "Sibling Discount",
      eligibility: "Second child enrolled",
      benefit: "10% discount on tuition fee",
    },
    {
      name: "EWS Scholarship",
      eligibility: "Family income below ₹2.5 LPA",
      benefit: "Up to 100% fee waiver (limited seats)",
    },
  ],
};
