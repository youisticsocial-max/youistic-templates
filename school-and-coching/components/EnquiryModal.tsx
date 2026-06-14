"use client";
import EnquiryForm from "./EnquiryForm";
import "./EnquiryModal.css";

interface EnquiryModalProps {
  isOpen: boolean;
  courseId: string;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, courseId, onClose }: EnquiryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        <EnquiryForm initialCourseId={courseId} onSuccess={() => {
          // Keep it open to show success or close it shortly
          setTimeout(onClose, 4000);
        }} />
      </div>
    </div>
  );
}
