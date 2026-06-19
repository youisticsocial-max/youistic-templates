import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const testimonials = [
  { id: 1, name: 'Michael Chen', company: 'Global Foods Processing Inc.', industry: 'Food Industry', rating: 5, text: 'The automated packaging lines we purchased from {{CLINIC_NAME}} have increased our output by 40%. Their engineering precision is unmatched, and the after-sales support has been exemplary.', logo: 'GF' },
  { id: 2, name: 'Sarah Jenkins', company: 'Apex Heavy Industries', industry: 'Manufacturing', rating: 5, text: 'We required a custom cooling solution for our new facility. The team delivered a system that not only met but exceeded our energy efficiency targets. Highly recommended B2B partner.', logo: 'AH' },
  { id: 3, name: 'David Rodriguez', company: 'Elite Hospitality Group', industry: 'Restaurants & Hotels', rating: 4, text: 'Equipping our latest resort kitchens with their commercial ranges and chillers was the best decision. The build quality of the stainless steel components is truly premium.', logo: 'EH' },
  { id: 4, name: 'Emma Wu', company: 'TechParts Manufacturing', industry: 'Factories', rating: 5, text: 'We rely on their CNC machinery for precision parts. In two years of continuous operation, we have experienced zero unplanned downtime. Built like tanks.', logo: 'TM' }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <PageTransition>
      <section className="bg-dark section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.9), rgba(10, 10, 12, 0.95)), url("assets/factory.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          
          <div className="text-center mb-16">
            <motion.h1 
              className="section-title text-5xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Client <span className="text-primary">Testimonials</span>
            </motion.h1>
            <motion.p 
              className="section-subtitle mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Trusted by leading industrial and commercial businesses worldwide.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 md:-translate-x-20 text-muted hover:text-primary transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={48} />
            </button>

            <div className="overflow-hidden relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="glass-panel p-10 md:p-16 rounded-xl metal-card absolute inset-0"
                >
                  <Quote size={48} className="text-primary/20 absolute top-8 left-8" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex mb-6 text-primary">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} size={20} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-xl md:text-2xl text-main leading-relaxed mb-8 italic">
                        "{testimonials[currentIndex].text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-auto border-t border-subtle pt-6">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-heading text-xl font-bold">
                        {testimonials[currentIndex].logo}
                      </div>
                      <div>
                        <h4 className="font-heading uppercase text-lg">{testimonials[currentIndex].name}</h4>
                        <p className="text-primary text-sm font-semibold">{testimonials[currentIndex].company}</p>
                        <p className="text-muted text-xs uppercase tracking-wider">{testimonials[currentIndex].industry}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 md:translate-x-20 text-muted hover:text-primary transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={48} />
            </button>
            
            {/* Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-primary scale-125' : 'bg-muted/30 hover:bg-muted'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Testimonials;
