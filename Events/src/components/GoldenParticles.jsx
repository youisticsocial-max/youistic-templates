import React, { useEffect, useRef } from 'react';

const GoldenParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const maxParticles = 60;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height; // start below or randomly
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = -(Math.random() * 0.7 + 0.2);
        this.speedX = (Math.random() * 0.4 - 0.2);
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.002 + 0.001;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Sine wave drift
        this.x += Math.sin(this.y * 0.01) * 0.1;

        // Fade in/out cycle
        if (this.growing) {
          this.opacity += 0.003;
          if (this.opacity >= 0.7) this.growing = false;
        } else {
          this.opacity -= this.opacity * 0.01;
          if (this.opacity <= 0.1) this.growing = true;
        }

        // Reset particle if out of screen
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.x = Math.random() * canvas.width;
          this.y = canvas.height + 10;
          this.size = Math.random() * 2.5 + 0.5;
          this.speedY = -(Math.random() * 0.7 + 0.2);
          this.speedX = (Math.random() * 0.4 - 0.2);
          this.opacity = Math.random() * 0.5 + 0.1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      const p = new Particle();
      // Distribute them vertically on load so they don't all rise from the bottom together
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0; // reset shadow for clearRect performance

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default GoldenParticles;
