import React from 'react';
import { useNavigate } from 'react-router-dom';

function SuggestedVideos({ videos = [], currentVideoId, title = 'Suggested Videos' }) {
  const navigate = useNavigate();

  // Filter out current video
  const filteredVideos = videos.filter((v) => v._id?.toString() !== currentVideoId?.toString());

  if (filteredVideos.length === 0) {
    return <p className="text-gray-500">No suggestions</p>;
  }

  return (
    <div className="w-full lg:w-[350px] space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>

      {filteredVideos.map((v) => (
        <div
          key={v._id?.toString()}
          className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
          onClick={() => navigate(`/video/${v._id}`)}
        >
          <div className="w-32 h-20 bg-gray-300 rounded-md overflow-hidden">
            <img
              src={v.thumbnail || '/default-thumbnail.jpg'}
              alt={v.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium line-clamp-2">{v.title}</p>
            <p className="text-xs text-gray-500">{v.owner?.username || 'Unknown'}</p>
            <p className="text-xs text-gray-500">{v.views ?? 0} views</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SuggestedVideos;
