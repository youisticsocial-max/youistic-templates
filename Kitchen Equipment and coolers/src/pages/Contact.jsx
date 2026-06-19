import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  return (
    <PageTransition>
      <section className="bg-dark section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.8), rgba(10, 10, 12, 0.9)), url("assets/machine-3.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '150px' }}>
        <div className="container text-center">
          <motion.h1 
            className="section-title text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contact <span className="text-primary">Us</span>
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get in touch for custom engineering solutions, bulk orders, and technical support.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title mb-8">Headquarters</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 shrink-0 border border-primary/20">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading uppercase mb-1">Factory & Office</h4>
                    <p className="text-muted leading-relaxed">{"{{ADDRESS}}"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 shrink-0 border border-primary/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading uppercase mb-1">Direct Line</h4>
                    <p className="text-muted leading-relaxed mb-2">Available Mon-Fri, 9am - 6pm</p>
                    <div className="flex gap-4">
                      <a href="tel:{{PHONE}}" className="text-white hover:text-primary transition-colors font-mono">{"{{PHONE}}"}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 shrink-0 border border-primary/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading uppercase mb-1">Email Inquiry</h4>
                    <a href="mailto:{{EMAIL}}" className="text-muted hover:text-primary transition-colors">sales@{"{{CLINIC_NAME}}"}.com</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="tel:{{PHONE}}" className="btn btn-primary flex-1">
                  <Phone size={18} className="mr-2" /> Call Now
                </a>
                <a href="https://wa.me/{{PHONE}}" className="btn btn-outline flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                  <MessageCircle size={18} className="mr-2" /> WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 rounded-lg metal-card"
            >
              <h3 className="text-2xl font-heading uppercase mb-6">Request a Quotation</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted mb-1">Company Name</label>
                    <input type="text" className="w-full bg-dark/50 border border-subtle rounded p-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Your Company" />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-1">Contact Person</label>
                    <input type="text" className="w-full bg-dark/50 border border-subtle rounded p-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="John Doe" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted mb-1">Email Address</label>
                    <input type="email" className="w-full bg-dark/50 border border-subtle rounded p-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-1">Phone Number</label>
                    <input type="tel" className="w-full bg-dark/50 border border-subtle rounded p-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="+1 234 567 890" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted mb-1">Inquiry Type</label>
                  <select className="w-full bg-dark/50 border border-subtle rounded p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                    <option>Product Quotation</option>
                    <option>Bulk Order Request</option>
                    <option>Custom Engineering</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-muted mb-1">Requirements / Message</label>
                  <textarea rows="4" className="w-full bg-dark/50 border border-subtle rounded p-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Describe your industrial requirements..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">
                  Submit Inquiry <Send size={18} className="ml-2" />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-card relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-muted bg-dark/80">
          <MapPin size={48} className="mb-4 text-primary opacity-50" />
          <h3 className="font-heading text-xl uppercase tracking-widest opacity-50">Interactive Map Integration</h3>
        </div>
        {/* Actual Google Maps iframe would go here */}
      </section>

    </PageTransition>
  );
};

export default Contact;
