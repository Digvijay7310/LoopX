import React from 'react'

function UploadLoading() {
  return (
     <div className="flex justify-center items-center h-full">
      <div className='flex justify-between gap-2'>
        <div className="border-4 border-white border-b-red-600 border-t-red-600 border-double h-20 w-20 md:h-30 md:w-30 rounded-full animate-spin flex justify-center items-center">
            <div className="border-4 border-red-800 border-dotted h-10 w-10 md:h-20 md:w-20 rounded-full animate-pulse flex justify-center items-center">
                
            </div>
        </div>
      </div>
    </div>
  )
}

export default UploadLoading