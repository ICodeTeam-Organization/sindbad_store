import React from 'react'

function CommentSkeleton() {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 animate-pulse w-full">
  <div className="flex justify-between items-center mb-2">
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-gray-200 mr-2"></div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-20"></div>
  </div>

  <div className="mt-2 space-y-2">
    <div className="h-3 bg-gray-200 rounded w-full"></div>
    <div className="h-3 bg-gray-200 rounded w-[90%]"></div>
    <div className="h-3 bg-gray-200 rounded w-[75%]"></div>
  </div>
</div>

  )
}

export default CommentSkeleton