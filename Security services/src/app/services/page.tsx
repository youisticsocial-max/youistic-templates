import Link from "next/link";
import { prisma } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Services.module.css";

export const metadata = {
  title: "Our Services | Indian Black Panther Security Services",
  description: "Explore our range of elite protection services including Security Guards, Armed Gunmen, Bouncers, and PSOs.",
};

async function getServices() {
  return await prisma.service.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  const comparisons = [
    { requirement: "High-value asset transit", guard: "✕ Avoid", gunman: "✓ Best Choice", bouncer: "✕ Avoid", pso: "✓ Good (Escort)" },
    { requirement: "Club, pub, gate control", guard: "✓ Good", gunman: "✕ Avoid", bouncer: "✓ Best Choice", pso: "✕ Avoid" },
    { requirement: "VIP/Celebrity escort", guard: "✕ Avoid", gunman: "✓ Good (Armed)", bouncer: "✓ Good (Crowd)", pso: "✓ Best Choice" },
    { requirement: "Corporate office patrolling", guard: "✓ Best Choice", gunman: "✕ Avoid", bouncer: "✕ Avoid", pso: "✕ Avoid" },
    { requirement: "Residential gates & societies", guard: "✓ Best Choice", gunman: "✕ Avoid", bouncer: "✕ Avoid", pso: "✕ Avoid" },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}></div>
        <div className={`container ${styles.bannerContainer}`}>
          <ScrollReveal direction="up">
            <span className="section-label">Our Capabilities</span>
            <h1 className={styles.bannerTitle}>ELITE DEFENSE SERVICES</h1>
            <p className={styles.bannerDesc}>
              Dynamic manpower, armed deterrence, and event control squads trained for Rajasthan&apos;s leading organizations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Detail List */}
      <section className="section">
        <div className="container">
          <div className={styles.servicesList}>
            {services.map((service, i) => {
              const features = service.features ? service.features.split("|").map(f => f.trim()) : [];
              const benefits = service.benefits ? service.benefits.split("|").map(b => b.trim()) : [];
              
              const isEven = i % 2 === 0;

              return (
                <div key={service.id} className={`${styles.serviceItem} ${isEven ? "" : styles.reverse}`}>
                  {/* Image Block */}
                  <ScrollReveal direction={isEven ? "left" : "right"} className={styles.imageCol}>
                    <div className={styles.imageContainer}>
                      <div className={styles.imageOverlay}></div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className={styles.image}
                      />
                    </div>
                  </ScrollReveal>

                  {/* Content Block */}
                  <ScrollReveal direction={isEven ? "right" : "left"} className={styles.contentCol}>
                    <span className={styles.serviceCategory}>{service.category} PROTECTION</span>
                    <h2 className={styles.serviceName}>{service.name}</h2>
                    <p className={styles.longDesc}>{service.longDescription}</p>

                    {/* Features list */}
                    {features.length > 0 && (
                      <div className={styles.sectionBlock}>
                        <h4 className={styles.blockTitle}>Key Features</h4>
                        <ul className={styles.featureList}>
                          {features.map((f, idx) => (
                            <li key={idx} className={styles.featureItem}>
                              <span className={styles.bullet}>✓</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Benefits list */}
                    {benefits.length > 0 && (
                      <div className={styles.sectionBlock}>
                        <h4 className={styles.blockTitle}>Strategic Benefits</h4>
                        <ul className={styles.benefitList}>
                          {benefits.map((b, idx) => (
                            <li key={idx} className={styles.benefitItem}>
                              <span className={styles.bullet}>✦</span> {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className={styles.ctaRow}>
                      <Link href="/contact" className="btn btn-primary">Hire {service.name}</Link>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Matrix Section */}
      <section className="section" style={{ background: "var(--color-navy)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label">Suitability Grid</span>
            <h2 className="section-title">SERVICE COMPARISON MATRIX</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Evaluate and match security parameters to your specific defense requirements.
            </p>
          </div>

          <ScrollReveal direction="scale">
            <div className={styles.matrixWrapper}>
              <table className={styles.matrixTable}>
                <thead>
                  <tr>
                    <th>Security Need / Scenario</th>
                    <th>Elite Guard</th>
                    <th>Armed Gunman</th>
                    <th>Bouncers</th>
                    <th>Personal Officer (PSO)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.needCell}>{row.requirement}</td>
                      <td className={row.guard.includes("Best") ? styles.highlightBest : row.guard.includes("Good") ? styles.highlightGood : styles.avoid}>{row.guard}</td>
                      <td className={row.gunman.includes("Best") ? styles.highlightBest : row.gunman.includes("Good") ? styles.highlightGood : styles.avoid}>{row.gunman}</td>
                      <td className={row.bouncer.includes("Best") ? styles.highlightBest : row.bouncer.includes("Good") ? styles.highlightGood : styles.avoid}>{row.bouncer}</td>
                      <td className={row.pso.includes("Best") ? styles.highlightBest : row.pso.includes("Good") ? styles.highlightGood : styles.avoid}>{row.pso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
