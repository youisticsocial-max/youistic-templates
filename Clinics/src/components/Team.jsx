import React from 'react';
import { Award, Calendar, ShieldCheck } from 'lucide-react';

const doctors = [
  {
    name: "Dr. S. R. {{CLINIC_NAME}}",
    qualification: "BDS, MDS (Oral & Maxillofacial Implantologist)",
    specialization: "Senior Implantologist & Dental Surgeon",
    experience: "15+ Years Experience",
    bio: "Pioneer in computer-guided pain-free implants and complex dental reconstructive surgeries in Jodhpur.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dr. Neha {{CLINIC_NAME}}",
    qualification: "BDS, MDS (Pediatric & Preventive Dentistry)",
    specialization: "Consultant Pediatric Dentist",
    experience: "10+ Years Experience",
    bio: "Dedicated to providing gentle, fear-free treatments and preventive dental care tailored specifically for children.",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dr. Amit Sharma",
    qualification: "BDS, MDS (Orthodontics & Dentofacial Orthopedics)",
    specialization: "Specialist Orthodontist & Aligner Provider",
    experience: "8+ Years Experience",
    bio: "Expert in invisible braces (Invisalign), digital aligners, and corrective jaw treatment for adolescents and adults.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80"
  }
];

export default function Team() {
  return (
    <section id="team" className="section section-dark">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Our Experts</span>
          <h2 className="section-title">
            Meet Our <span>Professional Team</span>
          </h2>
          <p>
            Our clinic is backed by highly qualified, registered dental specialists committed to delivering safe and gentle care with advanced medical practices.
          </p>
        </div>

        <div className="grid grid-3 team-grid">
          {doctors.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className="doctor-image-wrapper">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="doctor-image"
                  loading="lazy"
                />
                <div className="doctor-exp-badge">
                  <ShieldCheck size={14} />
                  <span>{doctor.experience}</span>
                </div>
              </div>
              
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <span className="doctor-specialty">{doctor.specialization}</span>
                <span className="doctor-qual">{doctor.qualification}</span>
                <p className="doctor-bio">{doctor.bio}</p>
                
                <div className="doctor-footer-cta">
                  <a href="#appointment" className="btn btn-secondary btn-sm-card">
                    <Calendar size={14} />
                    <span>Book Appointment</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
