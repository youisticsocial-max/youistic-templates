import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Activity, FileCheck } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Certifications = () => {
  return (
    <PageTransition>
      <section className="bg-dark section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.8), rgba(10, 10, 12, 0.9)), url("assets/quality-testing.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '150px' }}>
        <div className="container text-center">
          <motion.h1 
            className="section-title text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Certifications & <span className="text-primary">Quality</span>
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our commitment to international standards of excellence and safety.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Quality <span className="text-primary">Assurance</span></h2>
              <p className="text-muted mb-4">
                At {"{{CLINIC_NAME}}"}, quality is not just a department, it's our core engineering philosophy. Every piece of machinery undergoes stringent testing procedures before it leaves our facility.
              </p>
              <p className="text-muted mb-4">
                We adhere to strict safety compliance standards, ensuring that our products are safe for operators and environmentally responsible.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-center text-muted"><FileCheck className="text-primary mr-3" size={20} /> 100% Pre-dispatch testing</li>
                <li className="flex items-center text-muted"><FileCheck className="text-primary mr-3" size={20} /> Raw material traceability</li>
                <li className="flex items-center text-muted"><FileCheck className="text-primary mr-3" size={20} /> Endurance and stress simulation</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img src="assets/quality-testing.jpg" alt="Testing" className="w-full h-full object-cover rounded-lg" />
              <img src="assets/engineer.jpg" alt="Inspection" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
          </div>

          <div className="text-center mb-10 mt-20">
            <h3 className="section-title text-3xl">Global <span className="text-primary">Certificates</span></h3>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: <Award size={48} />, title: 'ISO 9001:2015', desc: 'Certified Quality Management System' },
              { icon: <ShieldCheck size={48} />, title: 'CE Marking', desc: 'Compliance with European safety standards' },
              { icon: <Activity size={48} />, title: 'OHSAS 18001', desc: 'Occupational Health and Safety' },
              { icon: <FileCheck size={48} />, title: 'RoHS Compliant', desc: 'Restriction of Hazardous Substances' }
            ].map((cert, idx) => (
              <motion.div 
                key={idx}
                className="metal-card p-8 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-primary flex justify-center mb-6">{cert.icon}</div>
                <h4 className="text-xl font-heading uppercase mb-2 text-white">{cert.title}</h4>
                <p className="text-muted text-sm">{cert.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </PageTransition>
  );
};

export default Certifications;
