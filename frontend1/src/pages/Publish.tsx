import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";


export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate()

    return (
        <div>
            <Appbar />
            <div className="max-w-2xl mx-auto my-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6">

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder="Enter blog title"
                    />
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Blog Content
                    </label>
                    <textarea
                        id="content"
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 resize-none"
                        placeholder="Write your blog content here..."
                    ></textarea>
                </div>

                {/* Publish Button */}
                <button
                    onClick={async () => {
                        try {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title,
                                content
                            }, {
                                headers: {
                                    Authorization: localStorage.getItem("token") || ""
                                }
                            });

                            navigate(`/blog/${response.data.id}`);
                        } catch (error) {
                            console.error("Failed to publish blog:", error);
                            alert("Something went wrong while publishing your post.");
                        }
                    }}
                    className="w-full px-5 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                    Publish Post
                </button>
            </div>
        </div>
    );
};
