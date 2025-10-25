import React from 'react';
import { FiShare2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

function VideoShareButton({ videoId }) {
  const handleShare = (e) => {
    // Prevent bubbling to Link
    e.stopPropagation();
    e.preventDefault();

    const videoUrl = `${window.location.origin}/video/${videoId}`;

    navigator.clipboard
      .writeText(videoUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link.');
      });
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center text-gray-200 gap-1 cursor-pointer text-xs bg-red-600 rounded-2xl p-1 hover:text-white transition"
      title="Share video"
    >
      <FiShare2 />
      Share
    </button>
  );
}

export default VideoShareButton;
