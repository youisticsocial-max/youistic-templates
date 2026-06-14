import { FacultyMember } from "@/data/faculty";
import "./FacultyCard.css";

interface FacultyCardProps {
  member: FacultyMember;
}

export default function FacultyCard({ member }: FacultyCardProps) {
  return (
    <div className="faculty-card card animate-fade-up">
      <div className="faculty-avatar-container">
        {/* Generates a clean placeholder profile photo using initials with styling gradient */}
        <div className="faculty-avatar-fallback">
          <span>{member.name.split(" ").map((n) => n[0]).join("")}</span>
        </div>
        <div className="faculty-exp-badge">{member.experience}+ Yrs Exp</div>
      </div>
      <div className="faculty-info">
        <h3 className="faculty-name">{member.name}</h3>
        <span className="faculty-subject">{member.subject}</span>
        {member.specialization && (
          <span className="faculty-spec">{member.specialization}</span>
        )}
        <p className="faculty-qual">{member.qualification}</p>
      </div>
    </div>
  );
}
