import { Filter, Search } from "lucide-react";
import React, { useMemo, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SearchInputAndFilter({ instrumentsData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(""); // Default: Show all types
  // Extract unique instrument types
  const instrumentTypes = useMemo(() => {
    if (!Array.isArray(instrumentsData)) return [];
    return [
      "Alle Typen",
      ...new Set(instrumentsData.map((instrument) => instrument.type)),
    ];
  }, [instrumentsData]);

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Suchen Sie nach Name oder Symbol..."
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            {instrumentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Filter
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
    </div>
  );
}
