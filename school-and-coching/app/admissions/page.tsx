import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import "./admissions.css";

export default function AdmissionsPage() {
  const steps = [
    {
      num: "01",
      title: "Fill Enquiry Form",
      desc: "Complete the online admissions form or visit our campus counseling office in person.",
    },
    {
      num: "02",
      title: "Document Verification",
      desc: "Submit previous academic certificates, marksheets, proof of address, and photographs.",
    },
    {
      num: "03",
      title: "Entrance Test (ENET)",
      desc: "Sit for our diagnostic entrance evaluation to secure eligibility & merit scholarships.",
    },
    {
      num: "04",
      title: "Admission Confirmed",
      desc: "Pay the required registration / admission fees and secure your student batches.",
    },
  ];

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Admissions</span>
          </div>
          <h1>Admissions Open & Procedure</h1>
          <p>Learn about our simple 4-step registration process and fill the online enrollment form.</p>
        </div>
      </section>

      {/* ── 4-Step Process ── */}
      <section className="section admission-process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Procedure</span>
            <h2 className="section-title">Our Simple Admission Journey</h2>
            <p className="section-subtitle">
              Follow these simple checkpoints to get registered and start your sessions smoothly.
            </p>
          </div>

          <div className="grid-4 admission-steps-grid">
            {steps.map((s, index) => (
              <div className="admission-step-card card text-center" key={index}>
                <span className="step-number">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="section section-alt admission-form-section" id="admission-form-block">
        <div className="container grid-2">
          <div className="admission-form-text">
            <span className="section-label">Apply Now</span>
            <h2 className="section-title">Submit Online Registration</h2>
            <p className="lead-paragraph">
              Admissions are open for our schooling streams (Nursery to Class 12 Science/Commerce) and targeted IIT JEE/NEET competitive exam batches.
            </p>
            <p className="body-paragraph">
              Once you submit this form, our academic counseling representative will call you to explain class timings, document submission details, and schedule your ENET Entrance Test.
            </p>
            <div className="required-docs-checklist">
              <h4>Required Documents checklist:</h4>
              <ul>
                <li>✓ Copy of candidate's Birth Certificate</li>
                <li>✓ Marksheet of previous class cleared</li>
                <li>✓ Candidate passport-sized photographs (x4)</li>
                <li>✓ Parents' Identification & proof of address</li>
                <li>✓ TC (Transfer Certificate) from previous school</li>
              </ul>
            </div>
          </div>
          <div className="admission-form-wrapper">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
