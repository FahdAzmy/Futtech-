/* eslint-disable react/prop-types */
import { Globe, TrendingUp, TrendingDown, Clock, Activity } from "lucide-react";
import React from "react";

const InstrumentCard = ({ instrument, onDetails }) => {
  const isPositiveChange = instrument?.percentageChange >= 0;

  return (
    <div
      key={instrument?._id}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-lg mx-auto border border-gray-200 h-auto overflow-hidden"
    >
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Globe className="text-gray-400" size={18} />
              <h2 className="text-base font-semibold text-gray-900 truncate">
                {instrument?.name || "N/A"}
              </h2>
            </div>
            <div className="mt-1 text-xs font-medium text-gray-500 flex items-center gap-2">
              <span className="bg-gray-100 px-2 py-0.5 rounded">
                {instrument?.symbol || "N/A"}
              </span>
              <span className="text-gray-400">•</span>
              <span>{instrument?.nameExchange || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div
              className="text-2xl font-bold text-gray-900"
              data-testid="price-container"
            >
              {instrument?.currentPrice?.toFixed(3)}
              <span
                className="text-sm ml-1 text-gray-500"
                data-testid="currency"
              >
                {instrument?.currency || "N/A"}
              </span>
            </div>
            <div
              className={`flex items-center gap-1 mt-1 ${
                isPositiveChange ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositiveChange ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span className="text-sm font-semibold">
                {isPositiveChange ? "+" : ""}
                {instrument?.priceChange
                  ? instrument.priceChange.toFixed(2)
                  : "0.00"}
              </span>
              <span className="text-sm font-semibold">
                ({isPositiveChange ? "+" : ""}
                {instrument?.percentageChange
                  ? instrument.percentageChange.toFixed(2)
                  : "0.00"}
                %)
              </span>
            </div>
          </div>
          <Activity className="text-blue-500" size={24} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500 mb-1">Typ</div>
            <div className="text-sm font-medium text-gray-900 truncate">
              {instrument?.type || "N/A"}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500 mb-1">Land</div>
            <div className="text-sm font-medium text-gray-900 truncate">
              {instrument?.country || "N/A"}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500 mb-1">Börse</div>
            <div className="text-sm font-medium text-gray-900 truncate">
              {instrument?.operatingMIC || "N/A"}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500 mb-1">Währung</div>
            <div className="text-sm font-medium text-gray-900 truncate">
              {instrument?.currency || "N/A"}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onDetails()}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
        >
          <Clock size={16} />
          Weitere Details
        </button>
      </div>
    </div>
  );
};

export default InstrumentCard;
