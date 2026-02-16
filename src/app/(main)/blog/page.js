import BlogList from '@/components/blogs/BlogList';

export const metadata = {
  title: 'Blog | Followora',
  description: 'Read our latest blog posts about flowers, gifts, occasions, and more. Stay updated with tips and news from Flowora Shop.',
  keywords: ['blog', 'flowers', 'gifts', 'tips', 'news', 'Dubai', 'UAE'],
  openGraph: {
    title: 'Blog - Flowora Shop',
    description: 'Latest news and tips about flowers and gifts',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogList />;
}


