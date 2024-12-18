/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdditionalDetails from "../components/AdditionalDetails";
import InsurmentInformation from "../components/InsurmentInformation";
import HeaderOfInsurment from "../components/HeaderOfInsurment";
import useGetInstrument from "../Hooks/useGetInsurment";
import PriceChart from "../components/PriceChart";

const DetailsPage = () => {
  const navigate = useNavigate();
  const [candles, setCandles] = useState([]);
  const { instrument, loading } = useGetInstrument();
  useEffect(() => {
    // Update candles only when instrument.candles changes
    if (instrument?.candles) {
      setCandles(instrument.candles);
    }
  }, [instrument]);
  // Memoized price calculations

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-pulse w-20 h-20 mx-auto mb-4 bg-blue-500 rounded-full shadow-lg"></div>
          <p className="text-xl text-gray-700 font-medium">
            Laden der Instrumentdetails...
          </p>
        </div>
      </div>
    );
  }

  if (!instrument) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex justify-center items-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-6">
            Instrument nicht gefunden
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Zurück
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <HeaderOfInsurment instrument={instrument} candles={candles} />
        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Instrument Information */}
          <InsurmentInformation instrument={instrument} />
          {/* Price Chart */}
          <PriceChart candles={candles} />
        </div>
        {/* Additional Details */}
        <AdditionalDetails instrument={instrument} />
      </div>
    </div>
  );
};

export default DetailsPage;
