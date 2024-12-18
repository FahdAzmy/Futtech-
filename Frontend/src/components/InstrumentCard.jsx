/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Globe, ChevronRight } from "lucide-react";

const InstrumentCard = ({ instrument, onDetails }) => {
  return (
    <div
      key={instrument._id}
      className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{instrument.name}</h2>
          <Globe className="text-blue-600" size={24} />
        </div>

        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Symbol:</span>
            <span className="font-semibold text-blue-700">
              {instrument.symbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Typ:</span>
            <span>{instrument.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Land:</span>
            <span>{instrument.country}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Währung:</span>
            <span>{instrument.currency}</span>
          </div>
        </div>

        <button
          onClick={() => onDetails()}
          className="mt-6 w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Weitere Details
          <ChevronRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default InstrumentCard;
