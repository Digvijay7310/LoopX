import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import VideoCard from '../components/VideoCard';
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
        const res = await axiosInstance.get('/comments/my-comments');
        const commentData = res.data?.data?.comments || [];
        const validComments = commentData.filter((comment) => comment.video !== null);

        setComments(validComments);
        setCommentCount(validComments.length);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to fetch comments.');
      } finally {
        setLoading(false);
      }
    };
    document.title = 'LoopX - My Comments';

    fetchComments();
  }, []);

  const handleDelete = async (commentId) => {
    try {
      await axiosInstance.post('/comments/delete-comment', { commentId });

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
                <div key={comment._id} className="relative">
                  <VideoCard video={comment.video} />
                  <div className="p-2 mt-2 bg-gray-50 rounded">
                    <p className="italic text-sm text-gray-700">Comment: “{comment.text}”</p>
                    <button
                      onClick={() => setConfirmDeleteId(comment._id)}
                      className="text-red-600 text-xs mt-1 hover:underline"
                    >
                      Delete Comment
                    </button>

                    {confirmDeleteId === comment._id && (
                      <div className="mt-2 p-2 border border-red-300 bg-red-50 rounded">
                        <p className="text-xs text-red-700 mb-2">
                          Are you sure you want to delete this comment?
                        </p>
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="px-3 py-1 text-xs bg-red-600 text-white rounded mr-2"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-3 py-1 text-xs bg-gray-200 rounded"
                        >
                          Cancel
                        </button>
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
