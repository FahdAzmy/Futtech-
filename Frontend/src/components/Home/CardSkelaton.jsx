import React from "react";
import Skeleton from "react-loading-skeleton";
export default function CardSkelaton() {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-lg mx-auto border border-gray-200 h-auto overflow-hidden">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Skeleton circle width={18} height={18} />
              <Skeleton width={100} />
            </div>
            <div className="mt-1 text-xs font-medium text-gray-500 flex items-center gap-2">
              <Skeleton width={50} />
              <span className="text-gray-400">•</span>
              <Skeleton width={50} />
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={50} height={16} />
          </div>
          <Skeleton width={24} height={24} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <Skeleton width={40} />
            <Skeleton width={60} />
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <Skeleton width={40} />
            <Skeleton width={60} />
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <Skeleton width={40} />
            <Skeleton width={60} />
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <Skeleton width={40} />
            <Skeleton width={60} />
          </div>
        </div>

        {/* Action Button */}
        <Skeleton width={180} height={40} />
      </div>
    </div>
  );
}
