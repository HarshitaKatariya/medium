import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="sticky top-0 bg-white z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link to={'/blogs'} className=" text-2xl font-bold tracking-tight text-gray-900">
          Medium
        </Link>

        <div className="flex">
          <Link to={'/publish'}>
          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-2xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-8">New</button>
          </Link>
          <Avatar name="Harshita" />
        </div>
      </div>
    </div>
  );
};
