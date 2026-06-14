import Link from "next/link";
import { facilities } from "@/data/infrastructure";
import "./infra.css";

export default function InfrastructurePage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Infrastructure</span>
          </div>
          <h1>Our Campus & Infrastructure</h1>
          <p>Explore our premium facilities, state-of-the-art laboratories and vibrant sports complex.</p>
        </div>
      </section>

      {/* ── Visual Gallery & details ── */}
      <section className="section campus-gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Facilities</span>
            <h2 className="section-title">World-Class Learning Environment</h2>
            <p className="section-subtitle">
              We provide modern equipment and spacious facilities designed to support collaborative research and student wellness.
            </p>
          </div>

          {/* Grid */}
          <div className="grid-2 facilities-listing-grid">
            {facilities.map((fac) => (
              <div className="facility-gallery-card card" key={fac.id}>
                {/* Photo placeholder with CSS pattern */}
                <div className="facility-photo-placeholder">
                  <div className="photo-badge">{fac.icon}</div>
                  <span>EduVision {fac.name} Facility</span>
                </div>
                <div className="facility-details">
                  <h3>{fac.name}</h3>
                  <p>{fac.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transport Routes Detail ── */}
      <section className="section section-alt transport-routes-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">School Buses</span>
            <h2 className="section-title">Transport Routes & Timings</h2>
            <p className="section-subtitle">
              We run a fleet of GPS-monitored school buses covering key areas across the city for a safe commute.
            </p>
          </div>

          <div className="table-responsive card routes-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bus Route</th>
                  <th>Key Boarding Points Covered</th>
                  <th>Morning Departure Timing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Route 1 (Malviya Nagar)</strong></td>
                  <td>Malviya Nagar Sector 3 → Jagatpura Flyover → Mahal Road → Academy</td>
                  <td>7:00 AM Departure</td>
                </tr>
                <tr>
                  <td><strong>Route 2 (Mansarovar)</strong></td>
                  <td>Mansarovar Metro Stn → Pratap Nagar Block B → Academy</td>
                  <td>7:15 AM Departure</td>
                </tr>
                <tr>
                  <td><strong>Route 3 (Vaishali Nagar)</strong></td>
                  <td>Vaishali Nagar Central Mall → Queens Road → C-Scheme → Academy</td>
                  <td>7:00 AM Departure</td>
                </tr>
                <tr>
                  <td><strong>Route 4 (Tonk Road)</strong></td>
                  <td>Tonk Road Phatak → Durgapura Bus stand → Academy</td>
                  <td>7:30 AM Departure</td>
                </tr>
                <tr>
                  <td><strong>Route 5 (Ajmer Road)</strong></td>
                  <td>Ajmer Road Toll Plaza → Sodala Circle → Academy</td>
                  <td>7:10 AM Departure</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
