"use client";
import { useState } from "react";
import { Course } from "@/data/courses";
import EnquiryModal from "./EnquiryModal";
import "./CourseCard.css";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="course-card card">
        <div className="course-header">
          {course.badge && (
            <span className="course-badge badge badge-saffron">{course.badge}</span>
          )}
          <span className={`course-cat badge ${course.category === 'school' ? 'badge-blue' : 'badge-success'}`}>
            {course.category === 'school' ? 'Schooling' : 'Coaching'}
          </span>
          <h3 className="course-name">{course.name}</h3>
          <p className="course-desc">{course.description}</p>
        </div>

        <div className="course-details">
          <div className="course-detail-item">
            <span className="detail-icon">🎓</span>
            <div className="detail-content">
              <strong>Eligibility</strong>
              <span>{course.eligibility}</span>
            </div>
          </div>
          <div className="course-detail-item">
            <span className="detail-icon">⏱️</span>
            <div className="detail-content">
              <strong>Duration</strong>
              <span>{course.duration}</span>
            </div>
          </div>
          <div className="course-detail-item">
            <span className="detail-icon">👥</span>
            <div className="detail-content">
              <strong>Batch Size</strong>
              <span>{course.batchSize}</span>
            </div>
          </div>
          <div className="course-detail-item">
            <span className="detail-icon">🕒</span>
            <div className="detail-content">
              <strong>Timings</strong>
              <span>{course.timings}</span>
            </div>
          </div>
        </div>

        <div className="course-footer">
          <div className="course-fee">
            <strong>{course.fee.split('|')[0]}</strong>
            {course.fee.includes('|') && (
              <span className="fee-sub">{course.fee.split('|')[1]}</span>
            )}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>
            Enquire Now
          </button>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        courseId={course.id}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
