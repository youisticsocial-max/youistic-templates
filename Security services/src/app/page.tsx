import Link from "next/link";
import { prisma } from "@/lib/db";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Home.module.css";

// Dynamic database fetching
async function getHomeData() {
  const services = await prisma.service.findMany({ take: 5 });
  const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  return { services, settings };
}

export default async function HomePage() {
  const { services, settings } = await getHomeData();

  const processSteps = [
    { num: "01", title: "Consultation", desc: "Detailed discussion of your protection requirements and vulnerabilities." },
    { num: "02", title: "Security Assessment", desc: "Our tactical officers visit site locations to inspect access points." },
    { num: "03", title: "Deployment Planning", desc: "Custom strategic mapping, guard rosters, and emergency plans." },
    { num: "04", title: "Professional Protection", desc: "Vigilant, ex-military trained guards deployed on patrol duties." },
  ];

  const whyChooseUs = [
    { title: "Professionally Trained Staff", desc: "Strict vetting, physical fitness audits, and tactical training." },
    { title: "24/7 Emergency Response", desc: "Active command center for instant security backup." },
    { title: "Verified Security Personnel", desc: "Verified clean record checks for maximum safety." },
    { title: "Discipline and Professionalism", desc: "Sharp uniforms, strict military posturing, and focus." },
    { title: "Customized Security Plans", desc: "Flexible strategies tailored to your industrial/personal space." },
    { title: "Reliable and Trusted Service", desc: "Highly trusted by Rajasthan's elite corporates and hotels." },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.videoOverlay}></div>
          <div className={styles.lightEffect}></div>
          <ParticlesBackground />
        </div>
        <div className={`container ${styles.heroContainer}`}>
          <ScrollReveal direction="up" delay={0.2} className={styles.heroContent}>
            <span className={styles.heroBadge}>★ MILITARY-GRADE SECURITY AGENCY</span>
            <h1 className={styles.heroTitle}>
              YOUR SAFETY IS <br />
              <span className="gradient-text">OUR MISSION</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Elite Security Solutions With Highly Trained Guards, Professional Bouncers, 
              Armed Gunmen & Personal Security Officers.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className="btn btn-primary">Request Security</Link>
              <a href={`tel:${settings?.phoneNumber || "9845209643"}`} className="btn btn-outline">Call Now</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Statistics Section */}
      <section className={styles.stats}>
        <div className={`container ${styles.statsGrid}`}>
          <ScrollReveal direction="scale" delay={0.1}>
            <AnimatedCounter end={500} suffix="+" label="Security Personnel" />
          </ScrollReveal>
          <ScrollReveal direction="scale" delay={0.2}>
            <AnimatedCounter end={100} suffix="+" label="Events Protected" />
          </ScrollReveal>
          <ScrollReveal direction="scale" delay={0.3}>
            <AnimatedCounter end={1000} suffix="+" label="Happy Clients" />
          </ScrollReveal>
          <ScrollReveal direction="scale" delay={0.4}>
            <AnimatedCounter end={24} suffix="/7" label="Availability" />
          </ScrollReveal>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section" style={{ background: "var(--color-navy)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-label">Our Capabilities</span>
            <h2 className="section-title">ELITE SECURITY SERVICES</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Tailored protection options engineered for maximum safety, vigilance, and luxury protocol compliance.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, i) => (
              <ScrollReveal key={service.id} direction="up" delay={i * 0.1} className="glass-card">
                <div className={styles.serviceCard}>
                  <div className={styles.serviceHeader}>
                    <span className={styles.serviceIcon}>
                      {service.name.includes("Guards") ? "🛡️" : 
                       service.name.includes("Bouncers") ? "👥" : 
                       service.name.includes("Gunman") ? "🔫" : 
                       service.name.includes("PSO") ? "👔" : "📅"}
                    </span>
                    <h3 className={styles.serviceCardTitle}>{service.name}</h3>
                  </div>
                  <p className={styles.serviceDesc}>{service.shortDescription}</p>
                  <Link href="/services" className={styles.serviceLink}>
                    Learn More <span>→</span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-label">The Panther Shield</span>
            <h2 className="section-title">WHY CHOOSE US</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              We implement strict operating procedures to ensure discipline, swift response, and professional demeanor.
            </p>
          </div>

          <div className={styles.whyGrid}>
            {whyChooseUs.map((item, i) => (
              <ScrollReveal key={item.title} direction={i % 2 === 0 ? "left" : "right"} delay={0.1} className="glass-card">
                <div className={styles.whyCard}>
                  <div className={styles.whyHeader}>
                    <span className={styles.whyDot}></span>
                    <h3 className={styles.whyTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.whyText}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ background: "var(--color-navy)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <span className="section-label">Strategic Roadmap</span>
            <h2 className="section-title">OUR DEPLOYMENT PROCESS</h2>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineLine}></div>
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.num} direction="up" delay={i * 0.15} className={styles.timelineItem}>
                <div className={styles.timelineNumber}>{step.num}</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineStepTitle}>{step.title}</h3>
                  <p className={styles.timelineStepDesc}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
