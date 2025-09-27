import React from 'react';
import { useNavigate } from 'react-router-dom';

function SuggestedVideos({ videos, currentVideoId }) {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:w-[350px] space-y-4">
      <h2 className="text-lg font-semibold">Suggested Videos</h2>
      {videos
        .filter(v => v._id !== currentVideoId)
        .map(v => (
          <div
            key={v._id}
            className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
            onClick={() => navigate(`/video/${v._id}`)}
          >
            <div className="w-32 h-20 bg-gray-300 rounded-md overflow-hidden">
              <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium line-clamp-2">{v.title}</p>
              <p className="text-xs text-gray-500">{v.owner.username}</p>
              <p className="text-xs text-gray-500">{v.views} views</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SuggestedVideos;
