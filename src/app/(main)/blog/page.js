import BlogList from '@/components/blogs/BlogList';

export const metadata = {
  title: 'Blog | Followora',
  description: 'Read our latest blog posts about flowers, gifts, occasions, and more. Stay updated with tips and news from Aroma Flowers.',
  keywords: ['blog', 'flowers', 'gifts', 'tips', 'news', 'Dubai', 'UAE'],
  openGraph: {
    title: 'Blog - Aroma Flowers',
    description: 'Latest news and tips about flowers and gifts',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogList />;
}


