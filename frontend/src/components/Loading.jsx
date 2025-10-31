import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <div className="h-15 w-15  rounded-full border-2 border-t-white border-red-600 animate-spin"></div>
      <p>Loading....</p>

    </div>
  );
}

export default Loading;
