import React from 'react';
import { FiShare2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

function VideoShareButton({ videoId }) {
  const handleShare = (e) => {
    // Prevent bubbling to Link
    e.stopPropagation();
    e.preventDefault();

    const videoUrl = `${window.location.origin}/video/${videoId}`;
    
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center cursor-copy gap-1 text-sm text-gray-600 hover:text-red-600 transition"
      title="Share video"
    >
      <FiShare2 />
      Share
    </button>
  );
}

export default VideoShareButton;
