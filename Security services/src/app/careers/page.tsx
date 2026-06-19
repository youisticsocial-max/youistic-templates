import { prisma } from "@/lib/db";
import CareersForm from "./CareersForm";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Careers.module.css";

export const metadata = {
  title: "Careers | Join Our Security Squad | Indian Black Panther",
  description: "Apply for job openings as Security Guards, Bouncers, Gunmen, or PSOs. Join Rajasthan's elite security team.",
};

async function getJobOpenings() {
  return await prisma.jobOpening.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function CareersPage() {
  const openings = await getJobOpenings();

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}></div>
        <div className={`container ${styles.bannerContainer}`}>
          <ScrollReveal direction="up">
            <span className="section-label">Join Our Team</span>
            <h1 className={styles.bannerTitle}>CAREERS & RECRUITMENT</h1>
            <p className={styles.bannerDesc}>
              We recruit ex-military, ex-special forces, and highly fit individuals to maintain absolute discipline.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className={`container ${styles.mainGrid}`}>
          {/* Job Openings list */}
          <div className={styles.openingsCol}>
            <ScrollReveal direction="left">
              <h2 className={styles.sectionTitle}>CURRENT OPENINGS</h2>
              <div className="gold-divider"></div>
            </ScrollReveal>

            <div className={styles.openingsList}>
              {openings.map((job, idx) => {
                const reqs = job.requirements ? job.requirements.split("\n") : [];
                return (
                  <ScrollReveal key={job.id} direction="up" delay={idx * 0.1} className="glass-card">
                    <div className={styles.jobCard}>
                      <span className={styles.jobLocation}>📍 {job.location} | {job.type}</span>
                      <h3 className={styles.jobTitle}>{job.title}</h3>
                      <p className={styles.jobDesc}>{job.description}</p>
                      
                      {reqs.length > 0 && (
                        <div className={styles.jobReqsBlock}>
                          <h4 className={styles.reqsTitle}>Requirements:</h4>
                          <ul className={styles.reqsList}>
                            {reqs.map((r, rIdx) => (
                              <li key={rIdx}>• {r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
              {openings.length === 0 && (
                <p style={{ color: "var(--color-gray-500)" }}>No active job openings at this moment. You can still submit a general application.</p>
              )}
            </div>
          </div>

          {/* Form */}
          <div className={styles.formCol}>
            <ScrollReveal direction="right">
              <div className={styles.formSticky}>
                <h3 className={styles.formHeaderTitle}>SUBMIT APPLICATION</h3>
                <p className={styles.formHeaderDesc}>Our recruitment officers will contact you within 48 hours for physical fitness verification.</p>
                <CareersForm positions={openings.map(o => o.title)} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
