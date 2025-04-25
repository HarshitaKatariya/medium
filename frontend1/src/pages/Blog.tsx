import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
    const { loading, blog } = useBlog({
      id : id || ""
    });
    
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
      <FullBlog blog={blog}/>
    </div>
  )
}
