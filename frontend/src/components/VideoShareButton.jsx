import React from 'react';
import { FiShare2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

function VideoShareButton({ videoId, showbg, children }) {
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
       aria-label='Share this video'
      onClick={handleShare}
      className={`flex items-center justify-center gap-2 rounded-2xl px-2 py-0.5 transition-colors duration-200 cursor-pointer ${showbg ? 'bg-red-600 text-white hover:bg-red-700 transition-colors duration-200' : "bg-transparent"}`}
      title="Share video"
    >
      <FiShare2 />
      {showbg ? "Share": ""}
    </button>
  );
}

export default VideoShareButton;
