/* eslint-disable react/prop-types */
import { Info } from "lucide-react";
import DetailItem from "./DetailItem";

export default function InsurmentInformation({ instrument }) {
  const getCountryCode = (countryName) => {
    const countryCodeMap = {
      "United States": "USD",
      "United Kingdom": "GBP",
      "European Union": "EUR",
      Japan: "JPY",
      China: "CNY",
    };
    return (
      countryCodeMap[countryName] ||
      countryName?.slice(0, 3).toUpperCase() ||
      "N/A"
    );
  };
  return (
    <div className="md:col-span-1 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <Info className="mr-2 text-blue-600" /> Instrumentinformationen
      </h2>
      <div className="space-y-4">
        <DetailItem
          label="Asset-Typ"
          value={instrument.type || "N/A"}
          className="hover:bg-blue-50/50 transition"
        />
        <DetailItem
          label="Symbol"
          value={instrument.symbol || "N/A"}
          className="hover:bg-green-50/50 transition"
        />
        <DetailItem
          label="Land"
          value={
            instrument.country
              ? `${instrument.country} (${getCountryCode(instrument.country)})`
              : "Land nicht verfügbar"
          }
          className="hover:bg-yellow-50/50 transition"
        />
        <DetailItem
          label="Währung"
          value={instrument.currency || "N/A"}
          className="hover:bg-purple-50/50 transition"
        />
      </div>
    </div>
  );
}
