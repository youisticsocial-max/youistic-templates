import React, { useEffect, useState } from 'react';
import { Sparkles, Calendar, Phone, CheckCircle2, ChevronRight } from 'lucide-react';

const CounterItem = ({ target, duration, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Parse numeric target from strings like "500+" or "10+"
    const targetNum = parseInt(target.replace(/\D/g, ''));
    let start = 0;
    const end = targetNum;
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    if (incrementTime < 10) incrementTime = 10;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  const suffix = target.includes('+') ? '+' : '';

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <div
        className="text-gold-gradient"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '3.5rem',
          fontWeight: 'bold',
          lineHeight: '1',
          marginBottom: '0.5rem',
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--color-ivory)',
          opacity: 0.8,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const Home = ({ data, setActivePage }) => {
  const { hero, stats, services, settings } = data;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--color-black)',
        }}
      >
        {/* Cinematic Backdrop Image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${hero.bgImageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.45,
            zIndex: 1,
            transform: 'scale(1.05)',
            animation: 'slow-bg-glow 25s ease-in-out infinite alternate',
          }}
        />

        {/* Golden radial background overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(122, 30, 44, 0.4) 0%, rgba(11, 11, 11, 0.9) 100%)',
            zIndex: 2,
          }}
        />

        {/* Traditional Jaali Mesh Overlay */}
        <div className="jaali-bg" style={{ opacity: 0.2, zIndex: 3 }} />

        {/* Content */}
        <div className="container" style={{ zIndex: 4, textAlign: 'center', padding: '0 1.5rem' }}>
          <div
            className="floating-element"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1.5px solid var(--color-gold)',
              borderRadius: '20px',
              padding: '0.4rem 1.2rem',
              backgroundColor: 'rgba(91, 15, 23, 0.5)',
              color: 'var(--color-gold-light)',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
            <Sparkles size={14} /> Jodhpur's Premium Event Managers
          </div>

          <h1
            className="text-gold-gradient"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.1,
              fontWeight: '900',
              marginBottom: '1.5rem',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {hero.headline}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '3rem',
              color: 'rgba(255, 248, 231, 0.85)',
              fontWeight: '300',
            }}
          >
            {hero.subheading}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              className="btn-gold"
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
            >
              <Calendar size={18} /> {hero.ctaPrimary}
            </button>
            <a
              href={`tel:${settings.contactPhone}`}
              className="btn-outline-gold"
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
            >
              <Phone size={18} /> {hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Floating Quick Contact Badge (bottom right) */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            zIndex: 10,
            display: 'none',
          }}
          className="desktop-menu-container"
        >
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="royal-card glow-border"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.8rem 1.5rem',
              background: 'rgba(11, 11, 11, 0.8)',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              textShadow: '0 0 5px rgba(212,175,55,0.3)',
            }}
          >
            <div
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212,175,55,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
              }}
            >
              <Phone size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-gold-light)' }}>
                Direct Hotline
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--color-ivory)' }}>
                {settings.contactPhone}
              </div>
            </div>
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.6,
          }}
        >
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-gold)' }}>
            Scroll
          </span>
          <div
            style={{
              width: '18px',
              height: '30px',
              border: '1.5px solid var(--color-gold)',
              borderRadius: '10px',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '6px',
                backgroundColor: 'var(--color-gold)',
                borderRadius: '50%',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: '5px',
                animation: 'float 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* 2. GRAND EXPERIENCE COUNTER */}
      <section
        style={{
          backgroundColor: '#0B0B0B',
          borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
          padding: '4rem 0',
          position: 'relative',
          zIndex: 4,
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
          }}
        >
          {stats.map((st, idx) => (
            <CounterItem key={st.id} target={st.value} duration={1500} label={st.label} />
          ))}
        </div>
      </section>

      {/* 3. SIGNATURE SERVICES PREVIEW */}
      <section className="section-padding silk-bg">
        <div className="jaali-bg" style={{ opacity: 0.1 }} />
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <div className="gold-divider">
              <span className="dot" />
              <span className="mandala-center">✦</span>
              <span className="dot" />
            </div>
            <h2 className="section-title text-gold-gradient">Signature Services</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We curate grand celebrations with meticulous planning, royal aesthetics, and world-class artist arrangements.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {services.map((srv) => (
              <div key={srv.id} className="royal-card glow-border" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Image Section */}
                <div
                  style={{
                    height: '200px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${srv.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.8s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      padding: '1.5rem 1rem 0.5rem 1rem',
                      background: 'linear-gradient(to top, rgba(11,11,11,0.9), transparent)',
                    }}
                  />
                </div>

                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-gold-light)', marginBottom: '0.8rem' }}>
                  {srv.title}
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {srv.desc}
                </p>

                <div
                  style={{
                    borderTop: '1px solid rgba(212, 175, 55, 0.1)',
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <button
                    onClick={() => {
                      if (srv.id === 'wedding') setActivePage('weddings');
                      else if (srv.id === 'corporate') setActivePage('corporate');
                      else setActivePage('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      color: 'var(--color-gold)',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; }}
                  >
                    Explore Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE RS MUSIC EVENT */}
      <section className="section-padding" style={{ backgroundColor: '#0B0B0B' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <div className="gold-divider">
              <span className="dot" />
              <span className="mandala-center">✦</span>
              <span className="dot" />
            </div>
            <h2 className="section-title text-gold-gradient">The Royal Standard</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Why Rajasthan's elite trust RS Music Event to script their grandest life celebrations.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              { title: "Creative Event Concepts", text: "Unique designer themes drafted and styled to reflect your personal vision and heritage." },
              { title: "Professional Event Team", text: "On-site planners, hospitality managers, and technicians working in perfect coordination." },
              { title: "Premium Sound & Lighting", text: "High-fidelity concert-grade JBL sound arrays and spectacular automated stage light dynamics." },
              { title: "Customized Themes", text: "Tailored color palettes, custom structures, traditional jaali patterns, and royal drapes." },
              { title: "Timely Execution", text: "Flawless clockwork execution ensuring zero delays for rituals, entries, or dining services." },
              { title: "Complete Management", text: "End-to-end planning, artist bookings, local permissions, venue arrangements, and vendor handling." }
            ].map((item, idx) => (
              <div key={idx} className="royal-card glow-border" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(212, 175, 55, 0.1)',
                      color: 'var(--color-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--color-gold-light)', marginBottom: '0.5rem' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR EVENT JOURNEY TIMELINE */}
      <section className="section-padding silk-bg">
        <div className="jaali-bg" style={{ opacity: 0.1 }} />
        <div className="container">
          <div className="text-center" style={{ marginBottom: '5rem' }}>
            <div className="gold-divider">
              <span className="dot" />
              <span className="mandala-center">✦</span>
              <span className="dot" />
            </div>
            <h2 className="section-title text-gold-gradient">Our Event Journey</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              How we transform an initial vision into a grand, seamless celebration step by step.
            </p>
          </div>

          <div
            style={{
              position: 'relative',
              maxWidth: '800px',
              margin: '0 auto',
              paddingLeft: '2rem',
            }}
            className="timeline-container"
          >
            {/* Timeline center line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '29px',
                height: '100%',
                width: '2px',
                background: 'linear-gradient(to bottom, var(--color-gold) 0%, var(--color-maroon) 50%, var(--color-gold) 100%)',
              }}
            />

            {[
              { num: "01", title: "Understanding Your Vision", desc: "We sit down for detailed consultation sessions to understand your traditions, style choices, scale of event, and music preferences." },
              { num: "02", title: "Planning & Theme Designing", desc: "Our design team produces customized structural plans, color board guides, sound layout mappings, and artist itineraries." },
              { num: "03", title: "Venue Setup & Preparation", desc: "Our production crews deploy to the venue 24-48 hours early to coordinate rigging, stage creation, floral sculpting, and sound checks." },
              { num: "04", title: "Grand Celebration Execution", desc: "We supervise the entire flow on site—managing guest entries, cues, choreography timings, DJ beats, and food coordination." }
            ].map((step, idx) => (
              <div key={idx} style={{ position: 'relative', marginBottom: '3rem', paddingLeft: '2.5rem' }}>
                {/* Bullet number */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '0px',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-maroon)',
                    border: '2px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: 'var(--color-gold-light)',
                    boxShadow: '0 0 10px var(--color-gold)',
                    zIndex: 2,
                  }}
                >
                  {step.num}
                </div>

                <div className="royal-card glow-border" style={{ padding: '1.8rem' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section
        className="section-padding"
        style={{
          background: 'linear-gradient(to top, #0B0B0B, var(--color-maroon))',
          textAlign: 'center',
          borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        }}
      >
        <div className="container">
          <h2 className="text-gold-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            Ready to Plan Your Dream Celebration?
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Book Wasim & the RS Music Event team today to lock in dates, premium sound rigs, and world-class designer themes.
          </p>
          <button
            className="btn-gold"
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ padding: '1.2rem 3rem' }}
          >
            Start Designing Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
