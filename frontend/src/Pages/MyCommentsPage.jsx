import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // ✅ Import delete icon
import { toast } from 'react-toastify'; // Optional for feedback

function MyCommentsPage() {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // ✅ Track which comment is being confirmed

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get("/comments/my-comments");
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

  // ✅ DELETE COMMENT FUNCTION
  const handleDelete = async (commentId) => {
    try {
      await axiosInstance.post("/comments/delete-comment", { commentId });
      toast.success("Comment deleted");

      // Remove comment from state
      setComments((prev) => prev.filter(c => c._id !== commentId));
      setCommentCount(prev => prev - 1);
      setConfirmDeleteId(null); // close confirmation
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete comment");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading comments...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Comments</h2>

      {error && <p className="text-red-600">{error}</p>}

      {comments.length === 0 ? (
        <p className="text-gray-500">You haven’t commented on any videos yet.</p>
      ) : (
        <>
          <p className="mb-6 text-gray-600">
            Total Comments: <span className="font-semibold">{commentCount}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="group bg-white border rounded-lg shadow hover:shadow-md transition relative"
              >
                <Link to={`/video/${comment.video._id}`}>
                  <img
                    src={comment.video.thumbnail}
                    alt={comment.video.title}
                    className="w-full h-60 object-cover rounded-t-lg transition-transform duration-200"
                  />
                </Link>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {comment.video.title}
                    </h3>

                    {/* 🗑️ Delete Icon */}
                    <button
                      onClick={() => setConfirmDeleteId(comment._id)}
                      className="p-2 cursor-pointer text-red-500 hover:text-red-700 shadow-2xl bg-gray-100"
                      title="Delete comment"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <img
                      src={comment.video.owner?.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-sm text-gray-600">
                      <p>{comment.video.owner?.username}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.video.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-700">
                    <p className="line-clamp-3 italic">“{comment.text}”</p>
                  </div>

                  {/* ✅ Confirmation Box */}
                  {confirmDeleteId === comment._id && (
                    <div className="mt-4 p-3 border border-red-300 rounded bg-red-50">
                      <p className="text-sm text-red-700 mb-2">Delete this comment from this video?</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="px-3 py-1 text-sm cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-3 py-1 text-sm cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyCommentsPage;
