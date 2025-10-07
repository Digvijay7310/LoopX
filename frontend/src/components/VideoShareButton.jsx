import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { FiShare, FiShare2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

function VideoShareButton({ videoId }) {
  const handleShare = () => {
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
