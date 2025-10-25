import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="h-15 w-15 bg-red-100 rounded-full border-2 border-t-white border-red-600 animate-spin"></div>
      <p>Loading....</p>
    </div>
  );
}

export default Loading;
