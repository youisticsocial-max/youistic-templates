import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Wrench, Settings, CheckCircle, Truck } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const processSteps = [
  { id: 1, title: 'Research & Design', icon: <Lightbulb size={32} />, desc: 'Our engineers analyze requirements and create detailed CAD models for optimal performance.' },
  { id: 2, title: 'Engineering & Fabrication', icon: <Wrench size={32} />, desc: 'Using precision CNC machines and laser cutters to fabricate high-grade components.' },
  { id: 3, title: 'Assembly', icon: <Settings size={32} />, desc: 'Skilled technicians assemble the machinery in our state-of-the-art facility.' },
  { id: 4, title: 'Quality Testing', icon: <CheckCircle size={32} />, desc: 'Rigorous stress tests and quality checks to ensure industrial compliance and durability.' },
  { id: 5, title: 'Delivery & Support', icon: <Truck size={32} />, desc: 'Safe global dispatch followed by installation and comprehensive after-sales support.' }
];

const ManufacturingProcess = () => {
  return (
    <PageTransition>
      <section className="bg-dark section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.8), rgba(10, 10, 12, 0.9)), url("assets/industrial-process.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '150px' }}>
        <div className="container text-center">
          <motion.h1 
            className="section-title text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Manufacturing <span className="text-primary">Process</span>
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            How we turn raw steel into high-performance industrial machinery.
          </motion.p>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container">
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-subtle z-0 hidden md:block"></div>

            {processSteps.map((step, idx) => (
              <motion.div 
                key={step.id}
                className={`flex flex-col md:flex-row items-center justify-between mb-16 relative z-10 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                
                {/* Content Box */}
                <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'} mb-8 md:mb-0`}>
                  <div className="glass-panel p-8 rounded-lg metal-card">
                    <h3 className="text-2xl font-heading uppercase mb-3 text-white"><span className="text-primary mr-2">0{step.id}.</span> {step.title}</h3>
                    <p className="text-muted">{step.desc}</p>
                  </div>
                </div>

                {/* Icon Marker */}
                <div className="w-16 h-16 bg-primary rounded-full border-4 border-dark flex items-center justify-center text-white shadow-[0_0_20px_rgba(var(--primary-color-rgb),0.5)] z-20 absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                  {step.icon}
                </div>

                {/* Empty div for spacing on the other side */}
                <div className="w-full md:w-5/12"></div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </PageTransition>
  );
};

export default ManufacturingProcess;
