import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { courses } from "@/data/courses";
import { toppers } from "@/data/results";
import CourseCard from "@/components/CourseCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialSlider from "@/components/TestimonialSlider";
import EnquiryForm from "@/components/EnquiryForm";
import "./home.css";

export default function Home() {
  // Grab top 3 featured courses & toppers for the home preview
  const featuredCourses = courses.slice(0, 3);
  const featuredToppers = toppers.slice(0, 3);

  const features = [
    { title: "Experienced Faculty", desc: "Learn from top subject-matter experts and IIT/Medical veterans.", icon: "👨‍🏫" },
    { title: "Smart Classrooms", desc: "Modern classrooms equipped with interactive audio-visual learning tools.", icon: "🖥️" },
    { title: "Small Batch Size", desc: "Personalized focus with maximum 30 students per batch.", icon: "👥" },
    { title: "Regular Testing", desc: "Weekly assessment tests and detailed progress reporting for tracking.", icon: "📝" },
    { title: "Doubt clearing sessions", desc: "Dedicated doubt counters and direct teacher interactions.", icon: "💡" },
    { title: "Premium Study Material", desc: "Comprehensive syllabus notes and test papers compiled by experts.", icon: "📚" },
  ];

  return (
    <>
      {/* ── 1. Hero Section ── */}
      <section className="hero-section">
        <div className="hero-pattern" />
        <div className="container hero-container">
          <div className="hero-content animate-fade-left">
            <div className="hero-announcement animate-fade-up">
              <span className="pulse-dot" />
              <span>Admissions Open for {siteConfig.admissionYear}</span>
            </div>
            
            <h1 className="hero-title">
              Start Your Beautiful <br />
              And <span className="text-highlight">Bright Future</span>
            </h1>
            
            <p className="hero-desc">
              Affiliated with {siteConfig.affiliatedBoard} Board ({siteConfig.affiliationNumber}).
              Providing high-quality education and expert coaching for competitive exams.
            </p>

            <div className="hero-ctas">
              <Link href="/admissions" className="btn btn-primary btn-lg">
                Apply Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="/fees" className="btn btn-outline btn-lg">
                Download Brochure
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </Link>
            </div>
          </div>

          <div className="hero-graphics animate-fade-right">
            <div className="hero-main-card">
              <div className="card-badge">{siteConfig.affiliatedBoard} Board</div>
              <h3>Empowering Students to Lead Tomorrow</h3>
              <p>Welcome to {siteConfig.name}, where we shape young minds through holistic development and expert academic mentoring.</p>
              <div className="hero-bullet">✓ Qualified Teachers</div>
              <div className="hero-bullet">✓ Modern Infrastructure</div>
              <div className="hero-bullet">✓ High Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats counter overlap */}
      <StatsCounter />

      {/* ── 2. About Section ── */}
      <section className="section about-preview">
        <div className="container grid-2">
          <div className="about-visual animate-fade-left">
            <div className="experience-badge animate-fade-up">
              <h3>{siteConfig.stats.yearsExperience}+</h3>
              <span>Years of Excellence</span>
            </div>
            <div className="visual-graphic-card">
              <h4>Our Mission</h4>
              <p>To cultivate intellectual curiosity, academic excellence, and moral integrity in every student.</p>
            </div>
          </div>

          <div className="about-text animate-fade-right">
            <span className="section-label">Welcome To EduVision</span>
            <h2 className="section-title">Our EduVision System Inspires You More</h2>
            <p className="lead-paragraph">
              Founded in {siteConfig.established}, our academy is committed to providing a nurturing environment where students are inspired to achieve their full academic potential.
            </p>
            <p className="body-paragraph">
              We offer integrated classroom programs from Nursery to Class 12, along with targeted competitive exam coaching for JEE and NEET. Our holistic training approach focuses on conceptual clarity, rigorous assessments, and career counseling.
            </p>
            <div className="about-ctas">
              <Link href="/about" className="btn btn-primary">
                Read Director Message
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Features Section ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Key Features</span>
            <h2 className="section-title">Why Choose EduVision?</h2>
            <p className="section-subtitle">
              We stand apart through our comprehensive student-care systems, modern campus facilities, and proven track record.
            </p>
          </div>

          <div className="grid-3 features-grid">
            {features.map((f, i) => (
              <div className="feature-card card card-glass" key={i}>
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Courses Section ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Courses</span>
            <h2 className="section-title">Featured Academic Batches</h2>
            <p className="section-subtitle">
              Explore our top-performing schooling classes and competitive coaching modules designed for student success.
            </p>
          </div>

          <div className="grid-3 courses-grid">
            {featuredCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>

          <div className="section-footer-cta">
            <Link href="/courses" className="btn btn-secondary">
              View All Courses & Timings
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Results Section ── */}
      <section className="section section-dark results-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Pride</span>
            <h2 className="section-title">Results 2024 — Topper Achievements</h2>
            <p className="section-subtitle">
              Celebrating the outstanding success of our students who cleared JEE, NEET, and Board Exams with flying colors.
            </p>
          </div>

          <div className="grid-3 toppers-grid">
            {featuredToppers.map((t) => (
              <div className="topper-card card card-glass" key={t.id}>
                <div className="topper-avatar-container">
                  <div className="topper-avatar-fallback">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="topper-rank-badge">{t.achievement}</div>
                </div>
                <div className="topper-info">
                  <h3>{t.name}</h3>
                  <p className="topper-exam">{t.exam}</p>
                  <p className="topper-inst">{t.institution}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer-cta">
            <Link href="/results" className="btn btn-primary">
              View All Toppers & Selections
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Testimonials Section ── */}
      <TestimonialSlider />

      {/* ── 7. Enquiry Form Section ── */}
      <section className="section enquiry-home-section" id="enquiry-section">
        <div className="container grid-2">
          <div className="enquiry-text animate-fade-left">
            <span className="section-label">Admissions Open</span>
            <h2 className="section-title">Start Your Journey with Us Today</h2>
            <p className="lead-paragraph">
              Join a community dedicated to excellence. Admissions are open for all standard streams, competitive batches, and crash courses.
            </p>
            <div className="enquiry-bullets">
              <div className="eb-item">
                <span className="eb-icon">★</span>
                <div>
                  <h4>Scholarship Availability</h4>
                  <p>Up to 100% scholarship for high merit and EWS candidates.</p>
                </div>
              </div>
              <div className="eb-item">
                <span className="eb-icon">★</span>
                <div>
                  <h4>Transport & Bus Routes</h4>
                  <p>GPS tracking-enabled school transport services available city-wide.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="enquiry-form-container animate-fade-right">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
