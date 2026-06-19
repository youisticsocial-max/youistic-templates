import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, X } from 'lucide-react';
import { dataStore } from '../utils/dataStore';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    setBlogs(dataStore.getBlogs());
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blog-page">
      {/* Subpage Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/assets/group-fitness.jpg')" }}>
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Fitness Magazine</span>
          <h1>Fitness <span>Tips & Guides</span></h1>
          <p>Read columns authored by our master coaches covering nutrition science, progressive overload, and sleep recovery.</p>
        </div>
      </section>

      {/* Magazine Grid */}
      <section className="section blog-catalog-sec">
        <div className="glowing-bg" style={{ top: '20%', right: '5%' }}></div>
        <div className="container">
          <div className="grid grid-3 blog-grid">
            {blogs.map((post, idx) => (
              <motion.div
                key={post.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="blog-card glass-card"
                onClick={() => setActiveBlog(post)}
              >
                <div className="blog-card-header">
                  <span className="blog-tag-badge">{post.tag}</span>
                  <div className="blog-read-time">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3>{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>

                <div className="blog-card-footer">
                  <div className="blog-author">
                    <User size={14} className="author-icon" />
                    <span>{post.author}</span>
                  </div>
                  <span className="read-more-btn">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="article-overlay"
            onClick={() => setActiveBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="article-modal-box glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="article-close-btn" onClick={() => setActiveBlog(null)}>
                <X size={24} />
              </button>

              <div className="article-header-meta">
                <span className="blog-tag-badge">{activeBlog.tag}</span>
                <span className="article-date">
                  <Calendar size={14} style={{ marginRight: '6px' }} />
                  {activeBlog.date}
                </span>
                <span className="article-read-time">
                  <Clock size={14} style={{ marginRight: '6px' }} />
                  {activeBlog.readTime}
                </span>
              </div>

              <h2>{activeBlog.title}</h2>

              <div className="article-author-row">
                <div className="author-avatar-stub">
                  <User size={18} />
                </div>
                <div>
                  <span className="author-name">{activeBlog.author}</span>
                  <span className="author-title">Master Coach, {"{{CLINIC_NAME}}"}</span>
                </div>
              </div>

              <div className="article-body-text">
                {activeBlog.content.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              <div className="article-cta-block">
                <h4>Interested in customized training blueprints?</h4>
                <p>Book a private consultation with {activeBlog.author} today.</p>
                <a 
                  href={`https://wa.me/{{PHONE}}?text=Hi, I read the article by ${activeBlog.author} and I want to book a private consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Consult {activeBlog.author.split(' ')[0]} Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
