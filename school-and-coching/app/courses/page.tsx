"use client";
import { useState } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import "./courses.css";

export default function CoursesPage() {
  const [filter, setFilter] = useState<"all" | "school" | "coaching">("all");

  const filteredCourses = courses.filter((c) => {
    if (filter === "all") return true;
    return c.category === filter;
  });

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Courses & Batches</span>
          </div>
          <h1>Our Courses & Academic Programs</h1>
          <p>Browse through our structured school classes and expert coaching batches tailored for toppers.</p>
        </div>
      </section>

      {/* ── Courses Listing & Filters ── */}
      <section className="section courses-list-section">
        <div className="container">
          {/* Filters Bar */}
          <div className="courses-filter-bar animate-fade-up">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Offerings
            </button>
            <button
              className={`filter-btn ${filter === "school" ? "active" : ""}`}
              onClick={() => setFilter("school")}
            >
              School Program (Nursery - 12)
            </button>
            <button
              className={`filter-btn ${filter === "coaching" ? "active" : ""}`}
              onClick={() => setFilter("coaching")}
            >
              Coaching Batches (JEE / NEET / Boards)
            </button>
          </div>

          {/* Grid */}
          <div className="grid-3 courses-listing-grid">
            {filteredCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="no-courses-found">
              <p>No courses found under this category. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Call To Action / Booking Section ── */}
      <section className="section section-alt book-demo-section">
        <div className="container book-demo-inner card">
          <div className="book-demo-text">
            <h2>Book a Free Demo Class / Consultation</h2>
            <p>
              Experience our classrooms, teaching methods, and meet the faculty members before enrolling.
            </p>
            <div className="demo-perks">
              <span>✓ Free 1-on-1 career consultation</span>
              <span>✓ Guided tour of school labs & library</span>
              <span>✓ Free mock test & analysis report</span>
            </div>
          </div>
          <div className="book-demo-action">
            <Link href="/admissions" className="btn btn-primary btn-lg">
              Book Demo Class
            </Link>
            <Link href="/contact" className="btn btn-secondary btn-lg">
              Contact Counselor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
