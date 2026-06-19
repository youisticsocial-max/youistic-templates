import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, ShieldCheck } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const About = () => {
  return (
    <PageTransition>
      {/* Page Header */}
      <section className="bg-dark section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.8), rgba(10, 10, 12, 0.9)), url("assets/factory.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '150px' }}>
        <div className="container text-center">
          <motion.h1 
            className="section-title text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About <span className="text-primary">{"{{CLINIC_NAME}}"}</span>
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A legacy of precision engineering, industrial strength, and unwavering reliability.
          </motion.p>
        </div>
      </section>

      {/* Our Journey & Expertise */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">The Journey of <span className="text-primary">{"{{CLINIC_NAME}}"}</span></h2>
              <p className="text-muted mb-4">
                Since our inception, {"{{CLINIC_NAME}}"} has been at the forefront of manufacturing excellence. We specialize in designing and engineering high-performance machinery tailored for the evolving needs of the industrial sector.
              </p>
              <p className="text-muted mb-6">
                Our manufacturing expertise spans across robust commercial cooling systems, precise food processing equipment, and heavy-duty industrial machinery. We believe in innovation through continuous research and uncompromising quality control.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-muted"><ShieldCheck className="text-primary mr-3" size={20} /> State-of-the-art manufacturing facility</li>
                <li className="flex items-center text-muted"><ShieldCheck className="text-primary mr-3" size={20} /> ISO certified production processes</li>
                <li className="flex items-center text-muted"><ShieldCheck className="text-primary mr-3" size={20} /> Global export network</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src="assets/engineer.jpg" alt="Engineering Team" className="rounded-lg shadow-2xl border border-subtle w-full" />
              <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-lg shadow-lg">
                <h3 className="text-3xl font-bold font-heading mb-1 text-white">25+</h3>
                <p className="text-sm font-bold uppercase tracking-wider text-white">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-dark border-y border-subtle">
        <div className="container">
          <div className="grid grid-cols-2 gap-12">
            <motion.div 
              className="glass-panel p-10 rounded-xl"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Target size={48} className="text-primary mb-6" />
              <h3 className="text-2xl font-heading mb-4 uppercase tracking-wide">Our Mission</h3>
              <p className="text-muted">
                To empower industries globally by providing innovative, durable, and highly efficient manufacturing equipment that enhances productivity and operational excellence.
              </p>
            </motion.div>
            <motion.div 
              className="glass-panel p-10 rounded-xl"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Lightbulb size={48} className="text-primary mb-6" />
              <h3 className="text-2xl font-heading mb-4 uppercase tracking-wide">Our Vision</h3>
              <p className="text-muted">
                To be the world's most trusted partner for industrial machinery, pioneering new technologies that define the future of automated manufacturing and commercial infrastructure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership & Team */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our <span className="text-primary">Leadership</span></h2>
            <p className="section-subtitle mx-auto">The engineering minds driving innovation and quality.</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map((item, idx) => (
              <motion.div 
                key={item}
                className="metal-card text-center pb-6 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <img src={`assets/engineer.jpg`} alt="Team Member" className="w-full h-64 object-cover mb-6" />
                <h4 className="text-xl font-heading uppercase">John Doe</h4>
                <p className="text-primary text-sm font-semibold tracking-wider mb-3">Chief Engineer</p>
                <p className="text-muted px-6 text-sm">Leading the R&D department with over two decades of mechanical engineering experience.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  );
};

export default About;
