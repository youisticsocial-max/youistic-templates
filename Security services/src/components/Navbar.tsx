"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/gallery", label: "Gallery" },
  { href: "/clients", label: "Clients" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2L4 12v16l16 10 16-10V12L20 2z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
                <path d="M20 8l-10 6v12l10 6 10-6V14L20 8z" fill="#D4AF37" opacity="0.2"/>
                <path d="M20 14l-4 3v6l4 3 4-3v-6l-4-3z" fill="#D4AF37"/>
              </svg>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>INDIAN BLACK PANTHER</span>
              <span className={styles.logoSub}>SECURITY SERVICES</span>
            </div>
          </Link>

          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
            Hire Security
          </Link>

          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.active : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}>
        <div className={styles.mobileMenuInner}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className={styles.mobileLinkNum}>0{i + 1}</span>
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`btn btn-primary ${styles.mobileCta}`}
            onClick={() => setMobileOpen(false)}
          >
            Hire Security
          </Link>
        </div>
      </div>
    </>
  );
}
