"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2200);
    const removeTimer = setTimeout(() => setRemoved(true), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`}>
      <div className="loading-logo">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="55" stroke="#D4AF37" strokeWidth="1" opacity="0.3"/>
          <circle cx="60" cy="60" r="45" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2"/>
          <path d="M60 15L20 38v44l40 23 40-23V38L60 15z" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.5"/>
          <path d="M60 28L30 45v30l30 17 30-17V45L60 28z" fill="#D4AF37" opacity="0.15"/>
          <path d="M60 42L42 52v20l18 10 18-10V52L60 42z" fill="#D4AF37" opacity="0.3"/>
          <path d="M60 52L50 58v12l10 6 10-6V58L60 52z" fill="#D4AF37"/>
        </svg>
      </div>
      <div className="loading-text">Indian Black Panther</div>
      <div className="loading-bar">
        <div className="loading-bar-fill"></div>
      </div>
    </div>
  );
}
