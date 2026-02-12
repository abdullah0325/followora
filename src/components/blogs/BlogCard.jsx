'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { LoginHeading } from '../ui/Heading';

export default function BlogCard({ blog, isEven }) {
  console.log("blog",blog);
  
  const getFormattedDate = () => {
    try {
      const date = blog.published_at || blog.createdAt;
      if (!date) return 'No date';
      return format(new Date(date), 'MMMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const formattedDate = getFormattedDate();

  return (
    <article
      className={`flex flex-col ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } gap-8 items-center bg-white dark:bg-zinc-800 rounded-lg overflow-hidden py-5 hover:shadow-md transition-shadow`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 h-64 lg:h-96">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-200 to-red-200 dark:from-pink-900 dark:to-red-900 flex items-center justify-center text-6xl">
            📝
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 p-8">
       

        <LoginHeading text={blog.title} />

        {blog.content && (
          <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">{blog.content}</p>
        )}

        <Link
          href={`/blog`}
          className="inline-block text-pink-600 dark:text-pink-400 font-semibold hover:underline"
        >
          Read More →
        </Link>
         <div className="flex items-center justify-between px-5 text-sm text-gray-500 dark:text-gray-400 mb-4">
          {blog.author && <span>By {blog.author}</span>}
          <span>•</span>
          <time dateTime={blog.published_at || blog.createdAt}>{formattedDate}</time>
        </div>
      </div>
    </article>
  );
}

