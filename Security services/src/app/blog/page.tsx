import { Metadata } from 'next';
import { prisma as db } from '@/lib/db';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Security Insights & News | Indian Black Panther Security Services',
  description: 'Read expert security tips, industry news, and professional insights from Indian Black Panther Security Services.',
};

export const dynamic = 'force-dynamic';

async function getPosts() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    return posts;
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogClient posts={posts} />;
}
