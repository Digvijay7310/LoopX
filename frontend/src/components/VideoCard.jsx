import React from 'react';
import { FaThumbsUp, FaCommentDots, FaBell } from 'react-icons/fa';

function VideoCard() {
  const mainVideoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4';

  const suggestedVideos = [
    {
      title: 'Wildlife Adventure in the Jungle',
      src: 'https://vjs.zencdn.net/v/oceans.mp4',
      thumbnail: 'https://via.placeholder.com/128x80?text=Video+1',
    },
    {
      title: 'Ocean Deep Dive Documentary',
      src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      thumbnail: 'https://via.placeholder.com/128x80?text=Video+2',
    },
    {
      title: 'Mountain Hiking POV',
      src: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4',
      thumbnail: 'https://via.placeholder.com/128x80?text=Video+3',
    },
    {
      title: 'Sunset Time-lapse Compilation',
      src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      thumbnail: 'https://via.placeholder.com/128x80?text=Video+4',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Main Video Section */}
      <div className="flex-1">
        {/* Custom Styled Video Player */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 border-4 border-red-600">
          <video
            controls
            src={mainVideoSrc}
            className="w-full h-full object-cover bg-black"
          />
        </div>

        {/* Video Info */}
        <h1 className="text-xl font-semibold mb-2">
          Amazing Wildlife Journey in the Mountains and Beyond — Full Documentary HD (up to 100 chars)
        </h1>

        {/* Channel Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="rounded-full h-10 w-10"
          />
          <div>
            <p className="font-medium">Nature Channel</p>
            <p className="text-sm text-gray-500">Category: Wildlife</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">
          Enjoy this incredible wildlife documentary featuring stunning visuals and insightful narration across some of the most remote locations on Earth.
        </p>

        {/* Like / Comment / Subscribe */}
        <div className="flex gap-6 text-gray-700 text-lg">
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <FaThumbsUp />
            <span className="text-sm">Like</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-green-600">
            <FaCommentDots />
            <span className="text-sm">Comment</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
            <FaBell />
            <span className="text-sm">Subscribe</span>
          </div>
        </div>
      </div>

      {/* Suggested Videos */}
      <div className="w-full lg:w-[350px] space-y-4">
        <h2 className="text-lg font-semibold">Suggested Videos</h2>
        {suggestedVideos.map((video, idx) => (
          <div
            key={idx}
            className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
          >
            <div className="w-32 h-20 bg-gray-300 rounded-md overflow-hidden">
              <img
                src={video.thumbnail}
                alt={`Suggested video ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium line-clamp-2">{video.title}</p>
              <p className="text-xs text-gray-500">Nature Channel</p>
              <p className="text-xs text-gray-500">200K views • 1 week ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoCard;
