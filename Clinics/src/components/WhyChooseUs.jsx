import React from 'react';
import { 
  Award, 
  Cpu, 
  HeartHandshake, 
  CreditCard, 
  CheckCircle,
  Users,
  ShieldAlert
} from 'lucide-react';

const reasons = [
  {
    icon: <Award size={32} />,
    title: "15+ Years Experience",
    desc: "Led by expert senior doctors with a proven track record of successful dental surgeries and implants over 15 years."
  },
  {
    icon: <Cpu size={32} />,
    title: "Advanced Equipment",
    desc: "Equipped with state-of-the-art dental chairs, intraoral cameras, digital X-rays, and advanced sterilization protocols."
  },
  {
    icon: <HeartHandshake size={32} />,
    title: "Gentle Treatment",
    desc: "We prioritize patient comfort, offering completely pain-free procedures, relaxing music, and friendly post-care guides."
  },
  {
    icon: <CreditCard size={32} />,
    title: "Affordable EMI",
    desc: "Flexible payment plans and easy 0% interest monthly installment schemes for implants, root canals, and braces."
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section">
      {/* Decorative background shape */}
      <div className="why-bg-accent"></div>
      
      <div className="container">
        <div className="why-grid-layout">
          {/* Left: Heading and trust points */}
          <div className="why-info-col">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title">
              We Set the Standard in <span>Dental Excellence</span>
            </h2>
            <p className="why-main-text">
              {{CLINIC_NAME}} is committed to providing outstanding dental services in Jodhpur. We combine clinical skill, modern dental technology, and warm hospitality to make your visit pleasant and stress-free.
            </p>

            {/* Checklist of assurances */}
            <div className="why-checklist">
              <div className="why-check-item">
                <CheckCircle className="check-icon" size={20} />
                <div>
                  <h4>Sterilization Guarantee</h4>
                  <p>100% sterilized instruments autoclaved for every single patient.</p>
                </div>
              </div>
              <div className="why-check-item">
                <CheckCircle className="check-icon" size={20} />
                <div>
                  <h4>ISO Standard Materials</h4>
                  <p>We use premium implant and ceramic brands certified internationally.</p>
                </div>
              </div>
            </div>

            {/* Trust Badges Row */}
            <div className="trust-badges-wrapper">
              <div className="trust-badge-card">
                <Award className="t-icon" size={28} />
                <div className="t-text">
                  <h5>NABH Certified</h5>
                  <p>National healthcare standards</p>
                </div>
              </div>
              <div className="trust-badge-card">
                <Users className="t-icon" size={28} />
                <div className="t-text">
                  <h5>10,000+</h5>
                  <p>Happy Patients Treated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Reason cards grid */}
          <div className="why-cards-col">
            <div className="grid grid-2 why-cards-grid">
              {reasons.map((reason, idx) => (
                <div key={idx} className="reason-card">
                  <div className="reason-icon-box">
                    {reason.icon}
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
