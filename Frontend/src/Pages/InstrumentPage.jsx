/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import AdditionalDetails from "../components/DetailsPage/AdditionalDetails";
import InsurmentInformation from "../components/DetailsPage/InsurmentInformation";
import HeaderOfInsurment from "../components/DetailsPage/HeaderOfInsurment";
import useGetInstrument from "../Hooks/useGetInsurment";
import PriceChart from "../components/DetailsPage/PriceChart";

const DetailsPage = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl m mx-auto space-y-6">
        {/* Header Section */}
        <HeaderOfInsurment instrument={instrument} candles={candles} />
        {/* Content Grid */}
        <div className="grid md:grid-cols-1 gap-5">
          {/* Instrument Information */}
          <PriceChart candles={candles} />
          <InsurmentInformation instrument={instrument} />
          {/* Price Chart */}
        </div>
        {/* Additional Details */}
        <AdditionalDetails instrument={instrument} />
      </div>
    </div>
  );
};

export default DetailsPage;
