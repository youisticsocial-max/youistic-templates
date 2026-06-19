import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma as db } from '@/lib/db';
import styles from '../Blog.module.css';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await db.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | IBPSS Blog`,
    description: post.excerpt || 'Read this insight from Indian Black Panther Security Services',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await db.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  const formatDate = (d: Date) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className={styles.detailWrapper}>
      <div className="container">
        <Link href="/blog" className={styles.backBtn}>
          ← Back to Blog
        </Link>

        <article>
          <header className={styles.detailHeader}>
            {post.category && <span className={styles.detailCategory}>{post.category}</span>}
            <h1 className={styles.detailTitle}>{post.title}</h1>
            <div className={styles.detailMeta}>
              <span>{formatDate(post.createdAt)}</span>
              {post.author && (
                <>
                  <span>•</span>
                  <span>By {post.author}</span>
                </>
              )}
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </header>

          {post.image && (
            <div className={styles.detailHeroImage}>
              <img src={post.image} alt={post.title} className={styles.detailImg} />
            </div>
          )}

          <div
            className={styles.detailContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
