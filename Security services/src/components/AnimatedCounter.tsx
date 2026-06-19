"use client";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({ end, suffix = "", label, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "var(--font-heading)",
        fontSize: "clamp(36px, 5vw, 56px)",
        fontWeight: 800,
        background: "linear-gradient(135deg, #D4AF37, #e6c65a)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        lineHeight: 1.1,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase" as const,
        color: "var(--color-gray-300)",
        marginTop: "8px",
      }}>
        {label}
      </div>
    </div>
  );
}
