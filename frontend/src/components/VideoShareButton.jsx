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
       aria-label='Share this video'
      onClick={handleShare}
      className="flex items-center justify-center  text-white gap-1 cursor-pointer text-sm bg-red-600 hover:bg-red-800 rounded-2xl p-1 hover:text-white transition"
      title="Share video"
    >
      <FiShare2 />
    </button>
  );
}

export default VideoShareButton;
