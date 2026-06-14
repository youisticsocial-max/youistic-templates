"use client";
import { useState } from "react";
import Link from "next/link";
import { toppers, achievementStats } from "@/data/results";
import "./results.css";

export default function ResultsPage() {
  const [filterYear, setFilterYear] = useState<number | 0>(0); // 0 means all years

  const filteredToppers = toppers.filter((t) => {
    if (filterYear === 0) return true;
    return t.year === filterYear;
  });

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Academic Results</span>
          </div>
          <h1>Our Pride — Results & Achievements</h1>
          <p>Celebrating our toppers who cleared JEE, NEET, and Board exams with top scores.</p>
        </div>
      </section>

      {/* ── Performance Stats ── */}
      <section className="section achievements-stats-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Achievements</span>
            <h2 className="section-title">Record-Breaking Selection Metrics</h2>
            <p className="section-subtitle">
              A brief overview of our selections in premium national engineering, medical, and regional boards.
            </p>
          </div>

          <div className="grid-4 achievements-stats-grid">
            {achievementStats.map((stat, index) => (
              <div className="ach-stat-card card text-center" key={index}>
                <span className="ach-stat-icon">{stat.icon}</span>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Toppers Grid with filters ── */}
      <section className="section section-alt toppers-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Toppers</span>
            <h2 className="section-title">Glory of EduVision</h2>
            <p className="section-subtitle">
              Meet our leading toppers who turned aspiration into achievements. Filter by exam year.
            </p>
          </div>

          {/* Filters */}
          <div className="toppers-filters animate-fade-up">
            <button
              className={`filter-btn ${filterYear === 0 ? "active" : ""}`}
              onClick={() => setFilterYear(0)}
            >
              All Toppers
            </button>
            <button
              className={`filter-btn ${filterYear === 2024 ? "active" : ""}`}
              onClick={() => setFilterYear(2024)}
            >
              Class of 2024
            </button>
            <button
              className={`filter-btn ${filterYear === 2023 ? "active" : ""}`}
              onClick={() => setFilterYear(2023)}
            >
              Class of 2023
            </button>
          </div>

          {/* Grid */}
          <div className="grid-4 toppers-listing-grid">
            {filteredToppers.map((t) => (
              <div className="topper-card card" key={t.id}>
                <div className="topper-image-wrapper">
                  <div className="topper-avatar-fallback-page">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="topper-year-badge">{t.year}</div>
                </div>
                <div className="topper-details">
                  <span className="topper-metric-badge">{t.achievement}</span>
                  <h3 className="topper-name-page">{t.name}</h3>
                  <span className="topper-exam-name">{t.exam}</span>
                  <p className="topper-dest">{t.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scholarship Banner ── */}
      <section className="section scholarship-cta-section">
        <div className="container scholarship-cta-inner card text-center">
          <span className="scholar-icon">🌟</span>
          <h2>Are You Next? Grab Merit Scholarships</h2>
          <p>
            Students with high marks in boards or past entrance mock exams are eligible for up to 100% tuition fee waivers.
          </p>
          <div className="scholar-buttons">
            <Link href="/admissions" className="btn btn-primary btn-lg">
              Apply for Admission Test
            </Link>
            <Link href="/fees" className="btn btn-secondary btn-lg">
              Check Scholarship details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
