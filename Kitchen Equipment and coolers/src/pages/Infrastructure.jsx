import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Infrastructure = () => {
  return (
    <PageTransition>
      <section className="bg-dark section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.8), rgba(10, 10, 12, 0.9)), url("assets/manufacturing.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '150px' }}>
        <div className="container text-center">
          <motion.h1 
            className="section-title text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Infrastructure & <span className="text-primary">Factory</span>
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A look inside our world-class manufacturing facility.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Production <span className="text-primary">Facility</span></h2>
              <p className="text-muted mb-4">
                Our massive production facility is equipped with the latest advancements in manufacturing technology. Spread over 50,000 square meters, it houses dedicated sectors for fabrication, assembly, and testing.
              </p>
              <p className="text-muted">
                With a focus on automation and precision, our factory operates with high efficiency to meet global demands while maintaining uncompromising quality standards.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="assets/factory.jpg" alt="Factory Facility" className="w-full rounded-lg shadow-2xl border border-subtle" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <img src="assets/engineer.jpg" alt="Skilled Workforce" className="w-full rounded-lg shadow-2xl border border-subtle" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="section-title">Skilled <span className="text-primary">Workforce</span></h2>
              <p className="text-muted mb-4">
                Machinery is only as good as the minds that build it. {"{{CLINIC_NAME}}"} is proud of its team of highly skilled engineers, technicians, and quality inspectors.
              </p>
              <p className="text-muted">
                Regular training programs ensure our team stays ahead of the curve in industrial engineering, automation, and safety protocols.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12">
            {[
              { img: 'assets/quality-testing.jpg', title: 'Equipment Testing' },
              { img: 'assets/machine-1.jpg', title: 'Warehouse Storage' },
              { img: 'assets/industrial-process.jpg', title: 'Machinery Setup' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="relative overflow-hidden rounded-lg h-64 metal-card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h4 className="text-xl font-heading text-white uppercase tracking-wide">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </PageTransition>
  );
};

export default Infrastructure;
