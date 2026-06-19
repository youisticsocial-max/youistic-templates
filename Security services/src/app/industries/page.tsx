import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Industries.module.css";

export const metadata = {
  title: "Industries We Protect | Indian Black Panther Security Services",
  description: "Explore sectors we secure including corporates, hotels, banking, events, residential, and private protection.",
};

const industries = [
  { name: "Corporate Offices", desc: "Access control, corporate security officers, receptionist security, and floor patrolling.", icon: "🏢" },
  { name: "Hotels", desc: "Maintain luxury decorum, luggage screening, lobby guards, parking patrol, and bouncer escorts.", icon: "🏨" },
  { name: "Hospitals", desc: "Round-the-clock emergency area protection, patient wing control, and safety audits.", icon: "🏥" },
  { name: "Residential Societies", desc: "Rigorous visitor management gates, digital registers, vehicle stickers, and perimeter patrol.", icon: "🏡" },
  { name: "Factories & Warehouses", desc: "Material register security, labor control, boundary audits, CCTV monitoring, and fire safety.", icon: "🏭" },
  { name: "Shopping Complexes", desc: "Baggage auditing gates, fire exit coordination, control room, and parking space setup.", icon: "🛍️" },
  { name: "Banks & ATMs", desc: "Armed gunman guards, vault transit escorting, ATM patrolling, and emergency protocols.", icon: "🏦" },
  { name: "Private Events & Weddings", desc: "Special event bouncer deployment, guest checking, VIP queue escorts, and parking setups.", icon: "💍" },
  { name: "VIP Events & Concerts", desc: "Security sweeps, stage boundary control, exit path planning, and physical bouncers.", icon: "🎟️" },
];

export default function IndustriesPage() {
  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}></div>
        <div className={`container ${styles.bannerContainer}`}>
          <ScrollReveal direction="up">
            <span className="section-label">Sectors Protected</span>
            <h1 className={styles.bannerTitle}>INDUSTRIES WE PROTECT</h1>
            <p className={styles.bannerDesc}>
              Tailored military-grade security systems engineered for business operations, events, and asset sectors.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} direction="scale" delay={i * 0.05} className="glass-card">
                <div className={styles.card}>
                  <div className={styles.cardIcon}>{ind.icon}</div>
                  <h3 className={styles.cardTitle}>{ind.name}</h3>
                  <div className={styles.divider}></div>
                  <p className={styles.cardDesc}>{ind.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
