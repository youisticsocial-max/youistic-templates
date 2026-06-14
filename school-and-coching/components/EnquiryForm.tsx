"use client";
import { useState } from "react";
import { courses } from "@/data/courses";
import "./EnquiryForm.css";

interface EnquiryFormProps {
  initialCourseId?: string;
  onSuccess?: () => void;
}

export default function EnquiryForm({ initialCourseId = "", onSuccess }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    courseId: initialCourseId,
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.studentName || !formData.phone || !formData.courseId) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onSuccess) onSuccess();
      // Clear form
      setFormData({
        studentName: "",
        parentName: "",
        phone: "",
        email: "",
        courseId: "",
        address: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="enquiry-form-card card card-glass">
      {success ? (
        <div className="enquiry-success animate-fade-up">
          <div className="success-icon">✓</div>
          <h3>Enquiry Submitted Successfully!</h3>
          <p>Thank you for reaching out to us. Our admissions counselor will contact you within 24 hours.</p>
          <button className="btn btn-primary" onClick={() => setSuccess(false)}>
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="enquiry-form">
          <div className="form-title-area">
            <h3>Send Admissions Enquiry</h3>
            <p>Fill out the form below to receive detailed brochure & callback from our experts.</p>
          </div>

          {error && <div className="form-error-msg">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="studentName">
                Student Name *
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                className="form-input"
                placeholder="Enter student's name"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="parentName">
                Parent/Guardian Name
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                className="form-input"
                placeholder="Enter parent's name"
                value={formData.parentName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="courseId">
              Select Course / Class *
            </label>
            <select
              id="courseId"
              name="courseId"
              className="form-select"
              value={formData.courseId}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose Class or Coaching Program --</option>
              <optgroup label="Schooling Classes">
                {courses
                  .filter((c) => c.category === "school")
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Competitive Exam Coaching">
                {courses
                  .filter((c) => c.category === "coaching")
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Residential Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-input"
              placeholder="Enter full address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">
              Any Specific Question or Requirement?
            </label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full submit-btn" disabled={loading}>
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <>
                Submit Enquiry Form
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
