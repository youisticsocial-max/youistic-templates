import { prisma } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Testimonials.module.css";

export const metadata = {
  title: "Client Reviews & Testimonials | Indian Black Panther Security Services",
  description: "Read reviews from corporate leaders, event managers, and clients who trust our elite protection teams.",
};

async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}></div>
        <div className={`container ${styles.bannerContainer}`}>
          <ScrollReveal direction="up">
            <span className="section-label">Client Feedback</span>
            <h1 className={styles.bannerTitle}>TESTIMONIALS</h1>
            <p className={styles.bannerDesc}>
              Read detailed reports and reviews from our protected partners and corporate clients.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.id} direction="scale" delay={i * 0.05} className="glass-card">
                <div className={styles.card}>
                  <div className={styles.rating}>
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <span key={idx} className={styles.star}>★</span>
                    ))}
                  </div>
                  <p className={styles.feedback}>&ldquo;{t.feedback}&rdquo;</p>
                  
                  <div className={styles.clientRow}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.clientImage}
                      alt={t.clientName}
                      className={styles.avatar}
                    />
                    <div className={styles.clientMeta}>
                      <h4 className={styles.clientName}>{t.clientName}</h4>
                      <span className={styles.clientCompany}>{t.company}</span>
                    </div>
                  </div>

                  {t.videoUrl && (
                    <div className={styles.videoLink}>
                      <a href={t.videoUrl} target="_blank" rel="noopener noreferrer" className={styles.videoBtn}>
                        <span>▶</span> Watch Video Testimony
                      </a>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
