/* eslint-disable react/prop-types */
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function HeaderOfInsurment({ instrument }) {
  const navigate = useNavigate();

  const PriceChangeIndicator = ({ change }) => (
    <span
      className={`
            px-3 py-1 rounded-full text-sm font-semibold 
            ${
              change >= 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
          `}
    >
      {change >= 0 ? "+" : ""}
      {change.toFixed(2)}%
    </span>
  );
  return (
    <div className="bg-white max-md:w-full max-sm:w-full rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <ChevronLeft size={28} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {instrument.name} ({instrument.symbol})
            </h1>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-2xl font-semibold">
                {typeof instrument.currentPrice === "number"
                  ? `€${instrument.currentPrice.toFixed(2)}`
                  : "Preis nicht verfügbar"}
              </span>
              {typeof instrument.percentageChange === "number" && (
                <PriceChangeIndicator change={instrument.percentageChange} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
