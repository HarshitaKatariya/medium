import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-6 md:p-20">
      
      {/* Blog Content */}
      <div className="md:col-span-3">
        <h1 className="text-4xl font-bold leading-tight mb-2">
          {blog.title}
        </h1>
        {/* <p className="text-gray-500 mb-6">Posted on {blog.date}</p> */}
        <div className="text-lg text-gray-800 leading-relaxed space-y-4">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>
      </div>

      {/* Author Section */}
      <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Author</h3>
        <div className="flex items-start gap-4">
          <Avatar name={blog.author.name} />
          <div>
            <p className="text-xl font-bold">{blog.author.name}</p>
            {/* <p className="text-gray-500">{blog.author.bio}</p> */}
          </div>
        </div>
      </div>
      
    </div>
  );
};
