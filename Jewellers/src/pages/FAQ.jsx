import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is your shipping policy?",
      answer: "We offer free standard shipping on all orders over $100. Standard shipping typically takes 3-5 business days. Express shipping is available at an additional cost at checkout. International shipping times vary by destination."
    },
    {
      question: "How do I return or exchange an item?",
      answer: "We accept returns and exchanges within 30 days of purchase. The items must be unwashed, unworn, and have original tags attached. Simply initiate a return through our portal and drop the package off at any partner location."
    },
    {
      question: "How do your sizes run?",
      answer: "Our clothing is designed for a comfortable, slightly relaxed fit. We recommend checking our detailed Size Guide on each product page. If you are between sizes, we suggest sizing down for a more tailored look or sizing up for a looser fit."
    },
    {
      question: "How should I care for my garments?",
      answer: "To ensure longevity, we recommend washing your garments in cold water with similar colors and laying them flat to dry. Avoid using bleach and do not tumble dry wool or silk items."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. We also offer Buy Now, Pay Later options through Afterpay and Klarna."
    }
  ];

  return (
    <div className="faq-page section container" style={{ paddingTop: '160px', minHeight: '80vh' }}>
      <div className="text-center mb-xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="subtitle mt-sm"
        >
          Find answers to common questions about our products, shipping, and returns.
        </motion.p>
      </div>

      <div className="faq-accordion-container">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
          >
            <button 
              className="faq-question" 
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <span>{faq.question}</span>
              <ChevronDown 
                className={`faq-icon ${openIndex === index ? 'rotated' : ''}`} 
                size={20} 
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="faq-answer"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-xl">
        <p className="text-secondary mb-sm">Still have questions?</p>
        <a href="/contact" className="btn btn-primary">Contact Support</a>
      </div>
    </div>
  );
};

export default FAQ;
