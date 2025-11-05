import React from 'react';
import { FaComment } from 'react-icons/fa';

function CommentInput({ comment, setComment, onSubmit, isSubmitting = false, onFocus }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="mb-4 flex items-center bg-gray-100 rounded-full ring ring-gray-300 px-4 py-2 max-w-md mx-auto"
      aria-label="Add a comment"
      id="comment"
    >
      <label htmlFor="commentInput"></label>
      <input
        type="text"
        id="commentInput"
        name="commentInput"
        className="flex-grow bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus} // <-- here trigger the show comments
        disabled={isSubmitting}
        aria-required="true"
        aria-describedby="commentHelp"
      />
      <button
        type="submit"
        title="submit"
        className="ml-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-full p-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting || !comment.trim()}
        aria-label="Submit comment"
      >
        <FaComment />
      </button>
    </form>
  );
}

export default CommentInput;
