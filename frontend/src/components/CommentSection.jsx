import React, { useState } from 'react';
import CommentInput from './CommentInput';
import Comments from './Comments';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';

function CommentSection({ videoId, comments, setComments }) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle comments visibility on input focus or click
  const handleInputFocus = () => {
    setShowComments((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post(`/api/video/${videoId}/comment`, { text: comment });
      setComments([res.data.data, ...comments]); // Add new comment at top
      setComment('');
      toast.success('Comment added');
      setShowComments(true); // Make sure comments are visible after submit
    } catch (error) {
      toast.error('Error adding comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <CommentInput
        comment={comment}
        setComment={setComment}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onFocus={handleInputFocus} // toggle comments on input focus
      />

      {showComments && <Comments comments={comments} />}
    </div>
  );
}

export default CommentSection;
