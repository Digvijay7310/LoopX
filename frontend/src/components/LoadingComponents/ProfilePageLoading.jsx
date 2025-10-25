import React from 'react';

function ProfilePageLoading() {
  return (
    <div className="max-w-5xl mx-auto p-4 animate-pulse">
      {/* Header: Avatar + Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        {/* Avatar */}
        <div className="w-24 h-24 bg-gray-300 rounded-full" />

        {/* Profile Info */}
        <div className="flex flex-col gap-3 w-full">
          <div className="w-1/2 h-5 bg-gray-300 rounded" />
          <div className="w-1/3 h-4 bg-gray-200 rounded" />
          <div className="w-full h-4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-10 h-4 bg-gray-300 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded mt-1" />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-4 bg-gray-300 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded mt-1" />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-4 bg-gray-300 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded mt-1" />
        </div>
      </div>

      {/* Posts grid (thumbnails) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="w-full aspect-square bg-gray-300 rounded-md" />
        ))}
      </div>
    </div>
  );
}

export default ProfilePageLoading;
