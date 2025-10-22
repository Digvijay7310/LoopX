import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function MyCommentsPage() {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get('/api/comments/my-comments');
        const commentData = res.data?.data?.comments || [];
        const validComments = commentData.filter(comment => comment.video !== null);

        setComments(validComments);
        setCommentCount(validComments.length);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to fetch comments.');
      } finally {
        setLoading(false);
      }
    };
    document.title = "LoopX - My Comments"

    fetchComments();
  }, []);

  const handleDelete = async (commentId) => {
    try {
      await axiosInstance.post('/api/comments/delete-comment', { commentId });

      setComments((prev) => prev.filter((c) => c._id !== commentId));
      setCommentCount((prev) => prev - 1);
      setConfirmDeleteId(null);

      toast.success('Comment deleted');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete comment');
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading your comments...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Comments</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {comments.length === 0 ? (
        <p className="text-gray-500">You haven’t commented on any videos yet.</p>
      ) : (
        <>
          <p className="mb-6 text-gray-600">
            Total Comments: <span className="font-semibold">{commentCount}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {comments.map((comment) => {
              const video = comment.video;
              if (!video) return null;

              return (
                <div
                  key={comment._id}
                  className="group bg-white border rounded-lg shadow hover:shadow-md transition relative"
                >
                  <Link to={`/video/${video._id}`}>
                    <div className="aspect-video relative bg-black group">
                      <img src={video.thumbnail} alt={video.title}
                      className='h-full w-full object-cover' />
                    </div>
                  </Link>

                  <div className="px-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {video.title}
                      </h3>

                      <button
                        onClick={() => setConfirmDeleteId(comment._id)}
                        className="text-red-500 hover:text-red-700 p-2 bg-gray-100 rounded-full"
                        title="Delete comment"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                      <img
                        src={video.owner?.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="text-sm text-gray-600">
                        <p>{video.owner?.username || 'Unknown'}</p>
                        <p className="text-xs text-gray-400">
                        </p>
                        <p className="text-xs text-gray-500">
                         {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                         </p>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-700">
                      <p className="italic text-center"> Comment: “{comment.text}”</p>
                    </div>

                    {confirmDeleteId === comment._id && (
                      <div className="mt-4 p-3 border border-red-300 rounded bg-red-50">
                        <p className="text-sm text-red-700 mb-2">
                          Are you sure you want to delete this comment?
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MyCommentsPage;
