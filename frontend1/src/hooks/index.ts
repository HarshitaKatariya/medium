import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../pages/config";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>(); 

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data.blog );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch blogs", error);
        setLoading(false); // still turn off loading even if error occurs
      });
  }, []); 
  return { loading, blog };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]); // ✅ should be an array

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch blogs", error);
        setLoading(false); // still turn off loading even if error occurs
      });
  }, []); // ✅ Add dependency array to avoid infinite loop

  return { loading, blogs }; // ✅ Return data here
};
