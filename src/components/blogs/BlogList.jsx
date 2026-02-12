'use client';

import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { callPublicApi } from '@/services/callApis';

export default function BlogList() {
 const [blogs,setBlogs]=useState([])
const [loading,setLoading]=useState(true)

const fetchBlogs=async()=>{
  try {
 const res = await callPublicApi(
        "/blogs",
        "GET",
        null,
      );  console.log("res",res);
  if(res.success){
    setBlogs(res.blogs)
    setLoading(false)
  }
    
  } catch (error) {
    console.log("error",error);
    
  }
}
 useEffect(()=>{
  
  fetchBlogs()
  
 },[])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading blogs...</p>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
  //       <div className="text-center">
  //         <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
  //         <button
  //           onClick={() => dispatch(fetchBlogs(false))}
  //           className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  if (blogs &&
    blogs.length == 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No blogs found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Stay updated with the latest news and tips
          </p>
        </div>
        <div className="space-y-16">
          {blogs &&
          blogs.map((blog, index) => (
            <BlogCard key={blog.id || index} blog={blog} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}


