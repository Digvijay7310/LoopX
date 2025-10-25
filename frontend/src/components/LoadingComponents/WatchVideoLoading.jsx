import React from 'react';
import { FaThumbsUp, FaCommentDots, FaBell } from 'react-icons/fa';

function WatchVideoLoading() {
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
        <div className="bg-gray-300 relative w-full aspect-video rounded-lg overflow-hidden mb-4 border-2 border-red-600 animate-pulse"></div>

        {/* Video Info */}
        <h1 className="bg-gray-300 p-1 text-xl font-semibold mb-2"></h1>

        {/* Channel Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-2">
            <p className=" bg-gray-300 p-1 w-[300px] rounded-2xl"></p>
            <p className=" bg-gray-300 p-1 w-[300px] rounded-2xl"></p>
          </div>
        </div>

        {/* Description */}
        <p className="bg-gray-700 mb-4"></p>

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
        <div className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition">
          <div className="w-32 h-20 bg-gray-300 aspect-video rounded-md animate-pulse"></div>
          <div className="flex flex-col justify-center gap-2">
            <p className="w-[300px] bg-gray-300 animate-pulse p-1 rounded-xl"></p>
            <p className="h-1/4 w-1/5 bg-gray-300 animate-pulse"></p>
            <p className="h-1/4 w-1/5 bg-gray-300 animate-pulse"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchVideoLoading;
