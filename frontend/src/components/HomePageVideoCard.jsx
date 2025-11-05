import React from 'react';
import VideoShareButton from './VideoShareButton';
import { Link } from 'react-router-dom';

function HomePageVideoCard({ video }) {
  return (
    <Link
      to={`/video/${video._id}`}
       aria-label={`Watch video titled ${video.title}`}
      className="block group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Thumbnail with hover video */}
      <div className="aspect-video relative bg-black overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />

        <video
          src={video.videoUrl}
          aria-label={`Preview of ${video.title}`}
          className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

      {/* Video Info Section */}
      <div className="flex itesm-start gap-3 p-3">
        {/* Avatar */}
        <img
          src={video.owner?.avatar}
          alt={`${video.owner?.username}'s avatar`}
          loading='lazy'
          className="rounded-full w-9 h-9 object-cover flex-shrink-0 birder-fray-200"
        />

        {/* Title + metadata */}
        <div className="flex flex-col flex-grow">
          <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">{video.title}</h3>
          <p className="text-xs text-gray-600 mt-1">{video.owner?.username}{" "}
            <span className="text-xs text-gray-500">
            {video.views?.toLocaleString()} views • {" "}
             {new Date(video.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
             })}
          </span>
          </p>
          
        </div>

        {/* Share Button */}
        <div>
          <VideoShareButton videoId={video._id} />
        </div>
      </div>
    </Link>
  );
}

export default HomePageVideoCard;
