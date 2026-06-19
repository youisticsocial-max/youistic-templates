'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './Blog.module.css';

const CATEGORIES = ['All', 'Security Tips', 'Event Safety', 'Personal Protection', 'Industry Updates', 'Corporate Security'];

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: string | null;
  author?: string | null;
  image?: string | null;
  createdAt: Date;
}

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const formatDate = (d: Date) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContainer}`}>
          <p className={styles.bannerLabel}>Knowledge & Insights</p>
          <h1 className={styles.bannerTitle}>Security Intelligence<br /><span className={styles.gold}>Blog</span></h1>
          <p className={styles.bannerDesc}>Expert insights, industry updates, and professional security guidance from our elite team.</p>
        </div>
      </section>

      {/* Controls */}
      <section className={styles.controlsSection}>
        <div className="container">
          <div className={styles.controlsRow}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                id="blog-search"
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.categoryTabs}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  id={`blog-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className={styles.postsSection}>
        <div className="container">
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyIcon}>📰</p>
              <p className={styles.emptyText}>No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <>
              <p className={styles.resultsCount}>{filtered.length} article{filtered.length !== 1 ? 's' : ''} found</p>
              <div className={styles.postsGrid}>
                {filtered.map((post, i) => (
                  <article key={post.id} className={`${styles.postCard} card`}>
                    <div className={styles.cardImageBox}>
                      {post.image ? (
                        <img src={post.image} alt={post.title} className={styles.cardImage} />
                      ) : (
                        <div className={styles.cardImagePlaceholder}>
                          <span>🛡️</span>
                        </div>
                      )}
                      {post.category && (
                        <span className={styles.categoryBadge}>{post.category}</span>
                      )}
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span className={styles.metaDate}>{formatDate(post.createdAt)}</span>
                        {post.author && <span className={styles.metaAuthor}>By {post.author}</span>}
                      </div>
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      {post.excerpt && <p className={styles.cardExcerpt}>{post.excerpt}</p>}
                      <Link href={`/blog/${post.slug}`} className={`btn btn-ghost ${styles.readBtn}`}>
                        Read Article →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
