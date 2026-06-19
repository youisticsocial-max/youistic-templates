"use client";
import { useState } from "react";
import styles from "./Gallery.module.css";
import ScrollReveal from "@/components/ScrollReveal";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  url: string;
  type: string;
}

interface GalleryClientProps {
  initialItems: GalleryItem[];
}

const categories = ["ALL", "GUARDS", "BOUNCERS", "EVENTS", "VIP", "TRAINING"];

export default function GalleryClient({ initialItems }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const filteredItems = activeCategory === "ALL"
    ? initialItems
    : initialItems.filter(item => item.category.toUpperCase() === activeCategory);

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}></div>
        <div className={`container ${styles.bannerContainer}`}>
          <ScrollReveal direction="up">
            <span className="section-label">Vigilance in Action</span>
            <h1 className={styles.bannerTitle}>MEDIA GALLERY</h1>
            <p className={styles.bannerDesc}>
              A visual record of our elite personnel deployed across high-risk protection duties.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterTab} ${activeCategory === cat ? styles.active : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.masonry}>
            {filteredItems.map((item, i) => (
              <ScrollReveal key={item.id} direction="scale" delay={i * 0.05} className={styles.masonryItem}>
                <div className={styles.mediaCard} onClick={() => setLightboxUrl(item.url)}>
                  <div className={styles.mediaWrapper}>
                    <div className={styles.mediaOverlay}>
                      <span className={styles.expandIcon}>🔍</span>
                      <h3 className={styles.mediaTitle}>{item.title}</h3>
                      <span className={styles.mediaTag}>{item.category}</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.title}
                      className={styles.image}
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className={styles.noItems}>No items available in this category.</div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxUrl && (
        <div className={styles.lightbox} onClick={() => setLightboxUrl(null)}>
          <button className={styles.closeBtn} onClick={() => setLightboxUrl(null)}>×</button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightboxUrl} alt="Enlarged view" className={styles.lightboxImg} />
          </div>
        </div>
      )}
    </div>
  );
}
