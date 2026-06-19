import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { dataStore } from '../utils/dataStore';
import './Membership.css';

const Membership = () => {
  const [plans, setPlans] = useState([]);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    setPlans(dataStore.getMemberships());
    window.scrollTo(0, 0);
  }, []);

  const featuresList = [
    { name: 'Gym Floor & Standard Cardio Access', basic: true, premium: true, elite: true },
    { name: 'Strength Training Free-weight Access', basic: true, premium: true, elite: true },
    { name: 'Lockers, Showers & Amenities', basic: true, premium: true, elite: true },
    { name: 'Complimentary Initial Assessment', basic: true, premium: true, elite: true },
    { name: 'Unlimited Group Fitness Classes', basic: false, premium: true, elite: true },
    { name: 'Sauna, Steam & Recovery Lounges', basic: false, premium: true, elite: true },
    { name: '24/7 Premium Support Access', basic: false, premium: true, elite: true },
    { name: 'Bio-impedance Body Assessments', basic: false, premium: 'Monthly', elite: 'Bi-Weekly' },
    { name: '1-on-1 Personal Trainer Coaching', basic: false, premium: '1 Session/mo', elite: '8 Sessions/mo' },
    { name: 'Custom Nutrition & Macros Blueprints', basic: false, premium: false, elite: true },
    { name: 'Complimentary Guest Passes', basic: false, premium: false, elite: 'Unlimited' }
  ];

  return (
    <div className="membership-page">
      {/* Subpage Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/assets/fitness-equipment.jpg')" }}>
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Pricing Packages</span>
          <h1>Membership <span>Plans</span></h1>
          <p>Invest in your physical assets. Select a high-performance tier tailored to your target lifestyle.</p>
        </div>
      </section>

      {/* Pricing Plans catalog */}
      <section className="section pricing-catalog-sec">
        <div className="glowing-bg" style={{ top: '25%', right: '10%' }}></div>
        <div className="container">
          {/* Toggle Switch */}
          <div className="billing-toggle-box">
            <span className={!isYearly ? 'active-label' : ''}>Monthly Billing</span>
            <button 
              className={`toggle-slider-btn ${isYearly ? 'yearly' : ''}`}
              onClick={() => setIsYearly(!isYearly)}
              aria-label="Toggle billing duration"
            >
              <div className="toggle-circle"></div>
            </button>
            <span className={isYearly ? 'active-label' : ''}>
              Yearly Billing <span className="discount-tag">Save ~15%</span>
            </span>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-3 pricing-cards-grid">
            {plans.map((plan, idx) => {
              const price = isYearly ? plan.priceYearly : plan.priceMonthly;
              const periodLabel = isYearly ? '/ Year' : '/ Month';
              
              return (
                <motion.div
                  key={plan.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className={`pricing-card glass-card ${plan.popular ? 'popular-tier' : ''}`}
                >
                  {plan.popular && (
                    <div className="popular-badge">
                      Most Selected
                    </div>
                  )}

                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <div className="plan-price-box">
                      <span className="price-symbol">$</span>
                      <span className="price-val">{price}</span>
                      <span className="price-period">{periodLabel}</span>
                    </div>
                  </div>

                  <ul className="plan-perks-list">
                    {plan.perks.map((perk, pIdx) => (
                      <li key={pIdx}>
                        <Check size={16} className="check-icon" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="plan-cta-box">
                    <a 
                      href={`https://wa.me/{{PHONE}}?text=Hi, I am interested in signing up for the ${plan.name} (${isYearly ? 'Yearly' : 'Monthly'}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} plan-cta-btn`}
                    >
                      Inquire Tier <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="section comparison-table-sec">
        <div className="glowing-bg" style={{ bottom: '15%', left: '5%' }}></div>
        <div className="container">
          <div className="section-header">
            <span className="badge-neon">Specs Sheet</span>
            <h2 className="section-title">Feature <span>Comparison</span></h2>
            <p className="section-subtitle">A granular breakdown of facilities, booking priority, and personalized coaching access.</p>
          </div>

          <div className="table-responsive-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Club Benefits</th>
                  <th>Basic</th>
                  <th>Premium</th>
                  <th>Elite</th>
                </tr>
              </thead>
              <tbody>
                {featuresList.map((feat, idx) => (
                  <tr key={idx}>
                    <td className="benefit-name-cell">{feat.name}</td>
                    
                    {/* Basic */}
                    <td>
                      {typeof feat.basic === 'boolean' ? (
                        feat.basic ? <Check size={18} className="table-check" /> : <X size={18} className="table-x" />
                      ) : (
                        <span className="table-text-val">{feat.basic}</span>
                      )}
                    </td>

                    {/* Premium */}
                    <td className="premium-col-highlight">
                      {typeof feat.premium === 'boolean' ? (
                        feat.premium ? <Check size={18} className="table-check" /> : <X size={18} className="table-x" />
                      ) : (
                        <span className="table-text-val">{feat.premium}</span>
                      )}
                    </td>

                    {/* Elite */}
                    <td>
                      {typeof feat.elite === 'boolean' ? (
                        feat.elite ? <Check size={18} className="table-check" /> : <X size={18} className="table-x" />
                      ) : (
                        <span className="table-text-val">{feat.elite}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
