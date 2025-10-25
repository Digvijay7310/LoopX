import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';
import VideoShareButton from './VideoShareButton';

function VideoCard({ video, onDelete, showDelete = false, showShare = true, showOwner = true }) {
  if (!video) return null;

  return (
    <div className="cursor-pointer rounded overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 relative border border-gray-200">
      {/* Video Link */}
      <Link to={`/video/${video._id}`}>
        {/* Thumbnail / Video hover */}
        <div className="aspect-video relative bg-black group">
          <img
            src={video.thumbnail || 'https://via.placeholder.com/300x200'}
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:hidden"
          />

          <video
            src={video.videoUrl}
            className="w-full h-full object-contain hidden group-hover:block"
            poster={video.thumbnail}
            muted
            loop
            playsInline
            preload="metadata"
            onMouseOver={(e) => {
              if (e.target.readyState >= 2) e.target.play();
            }}
            onMouseOut={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
          />
        </div>

        {/* Video Info */}
        <div className="flex mt-3 px-2 pb-2">
          {showOwner && (
            <img
              src={video.owner?.avatar || '/default-avatar.png'}
              alt={video.owner?.username}
              className="rounded-full w-9 h-9 object-cover mr-3"
            />
          )}

          <div className="flex flex-col flex-grow">
            <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">{video.title}</h3>

            {showOwner && <p className="text-xs text-gray-600 mt-1">{video.owner?.username}</p>}

            <p className="text-xs text-gray-500">
              {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      {(showDelete || showShare) && (
        <div className="absolute top-2 right-2 flex gap-2">
          {showDelete && (
            <button
              onClick={() => onDelete?.(video._id)}
              className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
              title="Delete Video"
            >
              <FiTrash size={16} />
            </button>
          )}

          {showShare && <VideoShareButton videoId={video._id} />}
        </div>
      )}
    </div>
  );
}

export default VideoCard;
