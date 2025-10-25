import React from 'react';

function Comments({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="space-y-4 max-w-md mx-auto">
        <h3 className="text-md font-semibold mb-2">Comments</h3>
        <p className="text-gray-500 text-sm">No comments yet!</p>
      </div>
    );
  }

  return (
    <section aria-label="Comments section" className="space-y-2 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-0.5 border-b border-gray-300 pb-0.5">Comments</h3>
      {comments.map(({ _id, user, text }) => (
        <article
          key={_id}
          className="flex gap-4 items-start bg-gray-50 p-3 rounded-md shadow-sm"
          role="article"
          aria-labelledby={`comment-${_id}-username`}
        >
          <img
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            loading="lazy"
          />
          <div className="flex flex-col">
            <h4 id={`comment-${_id}-username`} className="font-semibold text-sm text-gray-900">
              {user.username}
            </h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Comments;
