import Link from "next/link";
import { faculty } from "@/data/faculty";
import FacultyCard from "@/components/FacultyCard";
import "./faculty.css";

export default function FacultyPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Faculty</span>
          </div>
          <h1>Meet Our Experienced Faculty</h1>
          <p>Learn from qualified educationalists, expert coaching directors and specialized researchers.</p>
        </div>
      </section>

      {/* ── Faculty Directory ── */}
      <section className="section faculty-list-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Academic Team</span>
            <h2 className="section-title">Instructors & Subject Experts</h2>
            <p className="section-subtitle">
              Our teachers bring years of pedagogy experience and structured research backgrounds to help you excel.
            </p>
          </div>

          {/* Grid */}
          <div className="grid-4 faculty-listing-grid">
            {faculty.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Faculty Join Banner ── */}
      <section className="section section-alt join-faculty-section">
        <div className="container join-faculty-inner card">
          <div className="join-faculty-text">
            <h2>Want to Join Our Teaching Team?</h2>
            <p>
              We are always looking for passionate, result-oriented, and experienced teachers to guide our students.
            </p>
          </div>
          <div className="join-faculty-action">
            <Link href="/contact" className="btn btn-primary">
              Apply to Teach
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
