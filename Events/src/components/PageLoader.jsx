import React, { useEffect, useState } from 'react';

const PageLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800); // match CSS transition time
          }, 300);
          return 100;
        }
        // Random incremental steps for realistic load feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0B0B0B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s ease',
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Traditional Indian Jaali Screen Background */}
      <div className="jaali-bg" style={{ opacity: 0.15 }} />

      {/* Golden Glow Backdrop */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 1,
        }}
      />

      {/* Rotating Mandala Logo Core */}
      <div
        style={{
          width: '120px',
          height: '120px',
          position: 'relative',
          marginBottom: '2rem',
          zIndex: 2,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            fill: 'none',
            stroke: '#D4AF37',
            strokeWidth: '1.2',
            animation: 'spin-slow 15s linear infinite',
          }}
        >
          {/* Detailed Mandala SVG */}
          <circle cx="50" cy="50" r="45" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="38" />
          <circle cx="50" cy="50" r="10" strokeDasharray="1,1" />
          {/* Inner Petals */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <path
                key={i}
                d="M 50 50 C 40 30, 60 30, 50 15 C 40 30, 60 30, 50 50"
                transform={`rotate(${angle} 50 50)`}
                strokeWidth="0.8"
              />
            );
          })}
          {/* Outer Petals */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <path
                key={i}
                d="M 50 50 C 45 20, 55 20, 50 5 C 45 20, 55 20, 50 50"
                transform={`rotate(${angle} 50 50)`}
                strokeWidth="0.5"
                opacity="0.7"
              />
            );
          })}
        </svg>
        {/* Brand Monogram in center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#D4AF37',
            textShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
          }}
        >
          RS
        </div>
      </div>

      {/* Brand Text */}
      <h1
        className="text-gold-gradient"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.2rem',
          letterSpacing: '0.15em',
          marginBottom: '0.5rem',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        RS MUSIC EVENT
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#F0E6D2',
          opacity: 0.6,
          marginBottom: '3rem',
          zIndex: 2,
        }}
      >
        Royal Celebrations & Grand Productions
      </p>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '260px',
          height: '2px',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderRadius: '2px',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #5B0F17, #D4AF37)',
            boxShadow: '0 0 8px #D4AF37',
            transition: 'width 0.15s ease-out',
          }}
        />
      </div>

      {/* Progress Numbers */}
      <div
        style={{
          marginTop: '0.8rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          color: '#D4AF37',
          letterSpacing: '0.1em',
          zIndex: 2,
          opacity: 0.8,
        }}
      >
        {Math.min(progress, 100)}%
      </div>
    </div>
  );
};

export default PageLoader;
