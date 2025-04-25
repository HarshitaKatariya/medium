import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-2xl mx-auto space-y-6 px-4">
          {blogs.map(blog => (
            <BlogCard
              key={blog.id} // ensure this is a unique identifier
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate="2nd Mar 2025"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
