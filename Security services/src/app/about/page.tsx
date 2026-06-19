import ScrollReveal from "@/components/ScrollReveal";
import styles from "./About.module.css";

export const metadata = {
  title: "About Us | Indian Black Panther Security Services",
  description: "Learn about India's most disciplined, ex-military led premium security agency.",
};

export default function AboutPage() {
  const values = [
    { title: "Integrity", desc: "Honesty and transparency are the foundational pillars of our agency.", icon: "⚖️" },
    { title: "Vigilance", desc: "Unwavering attention and constant alertness across all deployments.", icon: "👁️" },
    { title: "Discipline", desc: "Strict adherence to military standards of presentation, posture, and protocol.", icon: "🎖️" },
    { title: "Commitment", desc: "Dedicated to safeguarding the life, assets, and properties of our clients.", icon: "🤝" },
    { title: "Excellence", desc: "Striving for zero errors through continuous training and strict audits.", icon: "🏆" },
  ];

  const milestones = [
    { year: "2015", title: "Foundation", desc: "Incorporated with a squad of 20 ex-servicemen providing close-quarter VIP security." },
    { year: "2018", title: "Corporate Expansion", desc: "Launched security guarding for industrial plants, IT parks, and major hotels in Jodhpur." },
    { year: "2021", title: "Elite Event Wing", desc: "Formed a specialized division of elite bouncers, crowd control managers, and metal detector setups." },
    { year: "2024", title: "Modern Commands", desc: "Upgraded to a 24/7 centralized command room coordinating 500+ deployed personnel." },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Header Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}></div>
        <div className={`container ${styles.bannerContainer}`}>
          <ScrollReveal direction="up">
            <span className="section-label">Our Story</span>
            <h1 className={styles.bannerTitle}>ELITE DEFENSE AGENCY</h1>
            <p className={styles.bannerDesc}>
              A legacy of protection, discipline, and ex-military command structure.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section">
        <div className={`container ${styles.introGrid}`}>
          <ScrollReveal direction="left" className={styles.introTextCol}>
            <h2 className="section-title">THE SQUAD YOU CAN TRUST</h2>
            <div className="gold-divider"></div>
            <p className={styles.paragraph}>
              Indian Black Panther Security Services was founded by veterans with a vision to redefine the private security landscape in India. We operate on a paramilitary model of strict training, physical accountability, and sharp discipline.
            </p>
            <p className={styles.paragraph}>
              Whether protecting massive corporate facilities, maintaining gate decorum at five-star hotels, or managing massive crowds at elite celebrity events, our guards stand tall and vigilant.
            </p>
            <div className={styles.mvGrid}>
              <div className={styles.mvCard}>
                <h4 className={styles.mvTitle}>Our Mission</h4>
                <p className={styles.mvText}>To provide elite, reliable, and customized protection solutions that give our clients absolute peace of mind.</p>
              </div>
              <div className={styles.mvCard}>
                <h4 className={styles.mvTitle}>Our Vision</h4>
                <p className={styles.mvText}>To be recognized as India&apos;s leading high-end private defense and VIP protection agency.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageOverlay}></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800" 
                alt="Security Leadership" 
                className={styles.introImage}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ background: "var(--color-navy)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-label">Core Creed</span>
            <h2 className="section-title">OUR PRINCIPLES</h2>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <ScrollReveal key={v.title} direction="scale" delay={i * 0.1} className="glass-card">
                <div className={styles.valueCard}>
                  <div className={styles.valueIcon}>{v.icon}</div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueText}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone timeline */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-label">Milestones</span>
            <h2 className="section-title">OUR HISTORY</h2>
          </div>

          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} direction="up" delay={i * 0.1} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{m.year}</div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>{m.title}</h4>
                  <p className={styles.timelineDesc}>{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
