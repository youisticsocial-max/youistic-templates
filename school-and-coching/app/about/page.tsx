import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import "./about.css";

export default function About() {
  const milestones = [
    { year: "2005", title: "Academy Established", desc: "Started with 50 students in schooling program." },
    { year: "2010", title: "CBSE Affiliation", desc: "Received senior secondary CBSE board affiliation." },
    { year: "2015", title: "Coaching Division Launched", desc: "Started dedicated classroom programs for JEE & NEET." },
    { year: "2020", title: "Smart Campus & Labs", desc: "Upgraded all classrooms to smart digital boards and modern science labs." },
    { year: "2024", title: "Topper Milestone", desc: "Achieved record selections in JEE Advanced (AIR 847) and NEET (680 Score)." },
  ];

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
          <h1>About Our Institution</h1>
          <p>Learn about our heritage, academic philosophies, leadership messages and historic milestones.</p>
        </div>
      </section>

      {/* ── 1. Heritage & Established Year ── */}
      <section className="section Heritage-section">
        <div className="container grid-2">
          <div className="heritage-text animate-fade-left">
            <span className="section-label">Our Heritage</span>
            <h2 className="section-title">Nurturing Excellence Since {siteConfig.established}</h2>
            <p className="lead-paragraph">
              EduVision Academy was founded with a vision to redefine classroom teaching and competitive exam mentoring.
            </p>
            <p className="body-paragraph">
              For over two decades, we have remained committed to providing student-centric schooling along with high-impact entrance test coaching. Our structured academic pathways ensure students balance standard boards successfully while preparing for challenging exams like IIT JEE and NEET.
            </p>
            <p className="body-paragraph">
              By combining experienced pedagogical methods, state-of-the-art laboratory practicals, and customized student analytics, we create a robust framework for intellectual growth.
            </p>
          </div>
          <div className="heritage-badge-visual animate-fade-right">
            <div className="established-circle card">
              <span>ESTD</span>
              <h3>{siteConfig.established}</h3>
              <p>20+ Years Legacy</p>
            </div>
            <div className="heritage-bullet-box card">
              <h4>Accredited Affiliation</h4>
              <p>{siteConfig.affiliatedBoard} Board Registered</p>
              <span>Affiliation Number: {siteConfig.affiliationNumber}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Mission & Values ── */}
      <section className="section section-alt values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Vision & Mission</span>
            <h2 className="section-title">Core Principles That Guide Us</h2>
            <p className="section-subtitle">
              We strive to empower every individual student with critical thinking, moral values, and academic grit.
            </p>
          </div>

          <div className="grid-3 values-grid">
            <div className="value-card card">
              <span className="value-icon">🎯</span>
              <h3>Our Vision</h3>
              <p>To be a leading center of educational excellence, producing moral leaders and top-tier scientific minds for the global society.</p>
            </div>
            <div className="value-card card">
              <span className="value-icon">🚀</span>
              <h3>Our Mission</h3>
              <p>To foster an inclusive environment of rigorous inquiry, continuous testing, personal mentoring, and holistic development.</p>
            </div>
            <div className="value-card card">
              <span className="value-icon">⚖️</span>
              <h3>Our Values</h3>
              <p>Academic honesty, discipline, mutual respect, perseverance, and a constant quest for conceptual understanding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Principal/Director Message ── */}
      <section className="section principal-message-section">
        <div className="container grid-2">
          <div className="principal-graphic-area animate-fade-left">
            <div className="principal-photo-card card">
              {/* Dynamic Initials profile icon wrapper */}
              <div className="principal-photo-fallback">
                <span>DR</span>
              </div>
              <div className="principal-meta">
                <h3>{siteConfig.principal.name}</h3>
                <span>Principal & Director</span>
                <p>{siteConfig.principal.qualification}</p>
              </div>
            </div>
          </div>

          <div className="principal-text-area animate-fade-right">
            <span className="section-label">Leadership Message</span>
            <h2 className="section-title">Message from our Principal</h2>
            
            <p className="message-paragraph">
              Dear Students and Parents, Welcome to {siteConfig.name}. As we navigate a rapidly transforming technological era, education must adapt to cultivate both technical competencies and moral integrity. Our goal is not merely to prepare students for standard classroom curriculum, but to nurture critical thinkers, problems solvers, and compassionate citizens.
            </p>
            
            <p className="message-paragraph">
              We understand that the transition from schooling to competitive exam preparation can be overwhelming. Therefore, our integrated academic program bridges boards and IIT JEE/NEET pathways smoothly. With our expert faculty team, personalized mentorship, and smart resources, we strive to make learning engaging and rewarding. I invite you to join our family and experience the difference.
            </p>

            <div className="principal-signature">
              <span className="sig-name">{siteConfig.principal.name}</span>
              <span className="sig-title">Principal, EduVision Academy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Key Milestones ── */}
      <section className="section section-alt milestones-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Milestones</span>
            <h2 className="section-title">Our Historic Journey</h2>
            <p className="section-subtitle">
              A timeline of dedication, expansion, and student success that marks our legacy.
            </p>
          </div>

          <div className="timeline-container">
            {milestones.map((m, index) => (
              <div className="timeline-item animate-fade-up" key={index}>
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-content card">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
