import { prisma } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Clients.module.css";

export const metadata = {
  title: "Our Clients | Indian Black Panther Security Services",
  description: "View our partnerships and corporate clients who trust us with their security and VIP safety.",
};

async function getClients() {
  return await prisma.clientLogo.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}></div>
        <div className={`container ${styles.bannerContainer}`}>
          <ScrollReveal direction="up">
            <span className="section-label">Trusted Partners</span>
            <h1 className={styles.bannerTitle}>OUR CLIENTS</h1>
            <p className={styles.bannerDesc}>
              Trusted by leading commercial corporations, hotels, event organizers, and retail brands.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 className="section-title">THE BRANDS WE SECURE</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              We provide continuous, high-grade monitoring and guard deployments for Rajasthan&apos;s premier brands.
            </p>
          </div>

          <div className={styles.grid}>
            {clients.map((client, i) => (
              <ScrollReveal key={client.id} direction="scale" delay={i * 0.05} className="glass-card">
                <div className={styles.logoCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={client.imageUrl}
                    alt={client.name}
                    className={styles.logoImage}
                  />
                  <span className={styles.logoName}>{client.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Box */}
      <section className="section" style={{ background: "var(--color-navy)" }}>
        <div className="container">
          <ScrollReveal direction="up" className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>BECOME A PROTECTED PARTNER</h2>
            <p className={styles.ctaDesc}>
              Secure your corporate headquarters, factory premises, or upcoming high-profile wedding event with Jodhpur&apos;s elite security force.
            </p>
            <div className={styles.ctaActions}>
              <a href="/contact" className="btn btn-primary">Establish Protection</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
