import React from 'react'

function HomePageLoading() {
    const cards = new Array(4).fill(null);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
    {cards.map((_, idx) => (
        <div 
        key={idx} 
        className='bg-gray-100 w-full max-w-sm m-auto mb-5 ' >
            {/* Thumbnail */}
        <div className='bg-gray-300 shadow-md aspect-video animate-pulse'>
        </div>
        {/* Title */}
        <p className='bg-gray-300 h-4 rounded mt-4 mx-4 animate-pulse'></p>
        {/* Avatar and title */}
        <div className='flex items-start gap-3 p-4'>
            <div className='bg-gray-300 h-10 w-10 rounded-full animate-pulse' ></div>
            {/* Text lines  */}
            <div className='flex flex-col gap-2 w-full'>
                <p className="bg-gray-300 h-3 w-3/4 rounded animate-pulse"></p>
                <p className="bg-gray-300 h-3 w-3/4 rounded animate-pulse"></p>
                <p className="bg-gray-300 h-3 w-3/4 rounded animate-pulse"></p>
            </div>
        </div>
    </div>
    ))}
    </div>
  )
}

export default HomePageLoading;

