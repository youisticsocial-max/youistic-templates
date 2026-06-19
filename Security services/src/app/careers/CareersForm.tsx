"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Careers.module.css";

interface CareersFormProps {
  positions: string[];
}

export default function CareersForm({ positions }: CareersFormProps) {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [preferredPosition, setPreferredPosition] = useState("");
  const [resumePath, setResumePath] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleResumeUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media?type=resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      
      setResumePath(data.url);
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    if (!fullName || !mobileNumber || !experience || !preferredPosition) {
      setSubmitError("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          mobileNumber,
          address,
          experience,
          preferredPosition,
          resumePath,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setSubmitSuccess(true);
      setFullName("");
      setMobileNumber("");
      setAddress("");
      setExperience("");
      setPreferredPosition("");
      setResumePath("");
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  const options = positions.length > 0 ? positions : ["Security Guard", "Professional Bouncer", "Armed Gunman", "Personal Security Officer (PSO)"];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {submitSuccess && (
        <div className={styles.successBox}>
          ✓ Application submitted successfully! Our recruitment wing will contact you soon.
        </div>
      )}
      {submitError && <div className={styles.errorBox}>{submitError}</div>}

      <div className={styles.formGroup}>
        <label className={styles.label}>Full Name *</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Mobile Number *</label>
        <input
          type="tel"
          className={styles.input}
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Preferred Position *</label>
        <select
          className={styles.select}
          value={preferredPosition}
          onChange={(e) => setPreferredPosition(e.target.value)}
          required
        >
          <option value="">Select Position</option>
          {options.map((pos) => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Experience details *</label>
        <textarea
          className={styles.textarea}
          placeholder="E.g., 2 years in ex-military service / VIP bouncer escort roles"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Residential Address</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter home address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Upload Resume (PDF / DOC)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className={styles.fileInput}
        />
        {uploading && <span className={styles.uploadingText}>Uploading file...</span>}
        {resumePath && <span className={styles.uploadedText}>✓ Resume uploaded: {resumePath.split("/").pop()}</span>}
        {uploadError && <span className={styles.uploadError}>{uploadError}</span>}
      </div>

      <button type="submit" disabled={submitting || uploading} className={`btn btn-primary ${styles.submitBtn}`}>
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
