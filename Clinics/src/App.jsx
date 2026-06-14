import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import AppointmentForm from './components/AppointmentForm';
import ContactMap from './components/ContactMap';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="app-wrapper">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero section with 3D Scroll Assembly */}
      <Hero />

      {/* Services Grid Section */}
      <Services />

      {/* Why Choose Us & Trust Badges Section */}
      <WhyChooseUs />

      {/* Doctors Team Profiles */}
      <Team />

      {/* Testimonial slider */}
      <Testimonials />

      {/* Interactive Booking Appointment Form */}
      <AppointmentForm />

      {/* Contact Details & Google Maps Embed */}
      <ContactMap />

      {/* Site Footer */}
      <Footer />

      {/* WhatsApp Chat Float */}
      <WhatsAppButton />
    </div>
  );
}
