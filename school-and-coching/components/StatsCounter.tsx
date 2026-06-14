"use client";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import "./StatsCounter.css";

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  icon: string;
}

function StatItem({ target, suffix, label, icon }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = Math.ceil(target / (duration / 30));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="stat-card card animate-fade-up">
      <div className="stat-icon">{icon}</div>
      <h3 className="stat-number">
        {count.toLocaleString()}
        {suffix}
      </h3>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  const statsList = [
    { target: siteConfig.stats.totalStudents, suffix: "+", label: "Students Enrolled", icon: "👨‍🎓" },
    { target: siteConfig.stats.totalCourses, suffix: "+", label: "Classes & Batches", icon: "📚" },
    { target: siteConfig.stats.skilledFaculty, suffix: "+", label: "Skilled Lecturers", icon: "👨‍🏫" },
    { target: siteConfig.stats.awards, suffix: "+", label: "Awards & Honors", icon: "🏆" },
  ];

  return (
    <section className="stats-section section-sm">
      <div className="container">
        <div className="grid-4 stats-grid">
          {statsList.map((stat, i) => (
            <StatItem
              key={i}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
