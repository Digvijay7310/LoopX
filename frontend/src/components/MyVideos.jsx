import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import VideoShareButton from './VideoShareButton';

function MyVideos({ video, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition relative">
      <Link to={`/video/${video._id}`}>
        <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{video.title}</h3>
          <p className="text-sm text-gray-500">{video.views} views</p>

          <div className="flex items-center gap-2 mt-2">
            <img
              src={video.owner?.avatar || "https://via.placeholder.com/40"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700">@{video.owner?.username}</span>
          </div>

          <p className="text-xs text-gray-400 mt-1">
            {new Date(video.createdAt).toDateString()}
          </p>
        </div>
        <VideoShareButton videoId={video._id} />
      </Link>

      {onDelete && (
        <button
          onClick={() => onDelete(video._id)}
          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          title="Delete Video"
        >
          <FiTrash />
        </button>
      )}
    </div>
  );
}

export default MyVideos;
