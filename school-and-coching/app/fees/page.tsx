"use client";
import { useState } from "react";
import Link from "next/link";
import { feeTable } from "@/data/fees";
import { siteConfig } from "@/data/siteConfig";
import "./fees.css";

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "school" | "coaching">("all");

  const filteredFees = feeTable.filter((row) => {
    if (activeTab === "all") return true;
    return row.category === activeTab;
  });

  const handleDownloadBrochure = () => {
    // Generate simple text blob as a brochure simulation
    const content = `
=============================================
         EDUVISION ACADEMY BROCHURE
=============================================
Affiliation Number: ${siteConfig.affiliationNumber}
Tagline: ${siteConfig.tagline}
Address: ${siteConfig.contact.address}

Established in ${siteConfig.established}, EduVision Academy is a premium
educational institution providing high-standard schooling and coaching.

---------------------------------------------
STREAM SELECTIONS & ANNUAL FEES
---------------------------------------------
${feeTable.map(r => `${r.class} - Tuition: ${r.tuitionFee} | Admission: ${r.admissionFee} | Total: ${r.totalPerYear}`).join('\n')}

---------------------------------------------
SCHOLARSHIPS PROGRAMS
---------------------------------------------
${siteConfig.scholarships.map(s => `${s.name} - Eligibility: ${s.eligibility} | Benefits: ${s.benefit}`).join('\n')}

For counseling & direct registrations, visit:
${siteConfig.contact.address}
Call: ${siteConfig.contact.phone}
Email: ${siteConfig.contact.email}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "eduvision-brochure.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Fee Structure</span>
          </div>
          <h1>Fee Structure & Scholarship Details</h1>
          <p>Transparent fee listings with flexible billing terms and merit-based discount details.</p>
        </div>
      </section>

      {/* ── Download Area ── */}
      <section className="section-sm download-brochure-bar">
        <div className="container download-inner card">
          <div className="dl-text">
            <h3>Download Admission Package</h3>
            <p>Get the complete syllabus, fee structures, transport charts and documents checklist in a single folder.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleDownloadBrochure}>
            Download Brochure / Syllabus (PDF)
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
        </div>
      </section>

      {/* ── Fees Structure Tables ── */}
      <section className="section fees-listing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Fee Tables</span>
            <h2 className="section-title">Academic Stream Tariffs</h2>
            <p className="section-subtitle">
              Below are the standard rates for each academic grade. No hidden charges or extra assessment penalties apply.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="fees-tabs">
            <button
              className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Packages
            </button>
            <button
              className={`tab-btn ${activeTab === "school" ? "active" : ""}`}
              onClick={() => setActiveTab("school")}
            >
              School Program
            </button>
            <button
              className={`tab-btn ${activeTab === "coaching" ? "active" : ""}`}
              onClick={() => setActiveTab("coaching")}
            >
              Coaching Batches
            </button>
          </div>

          {/* Table Container */}
          <div className="table-responsive card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Class / Course</th>
                  <th>Tuition Fee (Annual)</th>
                  <th>Admission Fee (One-Time)</th>
                  <th>Total / Year</th>
                </tr>
              </thead>
              <tbody>
                {filteredFees.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{row.class}</strong>
                    </td>
                    <td>{row.tuitionFee}</td>
                    <td>{row.admissionFee}</td>
                    <td className="total-highlight">{row.totalPerYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Scholarships Details ── */}
      <section className="section section-alt scholarship-info-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Scholarships</span>
            <h2 className="section-title">Merit & EWS Scholarships</h2>
            <p className="section-subtitle">
              We reward talent. Scholarships are automatically parsed during the Admission Entrance tests.
            </p>
          </div>

          <div className="grid-2 scholarship-info-grid">
            <div className="scholar-details-card card">
              <h3>Available Relief Schemes</h3>
              <div className="scholarships-list">
                {siteConfig.scholarships.map((s, index) => (
                  <div className="scholarship-item" key={index}>
                    <div className="scholarship-title">
                      <strong>{s.name}</strong>
                      <span className="badge badge-success">{s.benefit}</span>
                    </div>
                    <p>Eligibility: {s.eligibility}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="scholar-apply-card card section-dark">
              <h3>Admission Entrance Test</h3>
              <p>
                Our scholarship decisions are primarily based on the **EduVision National Entrance Test (ENET)** held in July every year.
              </p>
              <div className="test-highlights">
                <div className="th-item">
                  <span>📅</span>
                  <div>
                    <strong>Exam Date</strong>
                    <span>Sunday, July 12, 2026</span>
                  </div>
                </div>
                <div className="th-item">
                  <span>📝</span>
                  <div>
                    <strong>Format</strong>
                    <span>MCQ Pattern | Math, Science & IQ</span>
                  </div>
                </div>
              </div>
              <Link href="/admissions" className="btn btn-primary btn-lg">
                Register For Entrance Test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
