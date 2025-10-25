import React, { useState } from 'react';

function VideoDescription({ video }) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  return (
    <div className="mb-4 px-4 bg-gray-300 rounded-2xl">
      <span className="text-sm">Description: </span>
      <p className="text-gray-700">
        {showFullDesc
          ? video.description
          : video.description.length > 150
            ? video.description.slice(0, 150) + '...'
            : video.description}
        {video.description.length > 150 && (
          <button
            className="text-blue-600 ml-2 text-xs"
            onClick={() => setShowFullDesc(!showFullDesc)}
          >
            {showFullDesc ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
    </div>
  );
}

export default VideoDescription;
