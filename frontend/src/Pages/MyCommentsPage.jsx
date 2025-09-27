import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router-dom';

function MyCommentsPage() {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get("/users/my-comments");
        if (res.data?.data) {
          setComments(res.data.data.comments);
          setCommentCount(res.data.data.commentCount);
        } else {
          setError("No comment data found.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to fetch comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading comments...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Comments</h2>

      {error && <p className="text-red-600">{error}</p>}

      {comments.length === 0 ? (
        <p className="text-gray-500">You haven’t commented on any videos yet.</p>
      ) : (
        <>
          <p className="mb-6 text-gray-600">Total Comments: <span className="font-semibold">{commentCount}</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {comments.map((comment) => (
              <Link
                key={comment._id}
                to={`/video/${comment.video._id}`}
                className="group bg-white border rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={comment.video.thumbnail}
                  alt={comment.video.title}
                  className="w-full h-60 object-cover rounded-t-lg transition-transform duration-200"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {comment.video.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-2">
                    <img
                      src={comment.video.owner?.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-sm text-gray-600">
                      <p>{comment.video.owner?.username}</p>
                      <p className="text-xs text-gray-400">
                        {(new Date(comment.video.createdAt).toDateString())}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-700">
                    <p className="line-clamp-3 italic">“{comment.text}”</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyCommentsPage;
