import React, { useState, useMemo } from "react";
import InstrumentCard from "../components/InstrumentCard";
import useGetInstruments from "../Hooks/GetInstruments";
import { useNavigate } from "react-router-dom";
import { Database, Filter, Search } from "lucide-react";
// import SearchInputAndFilter from "../components/SearchInputAndFilter";

const FinancialPlatformDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(""); // Default: Show all types
  const navigate = useNavigate();
  const { instrumentsData, loading, setLoading } = useGetInstruments();
  // Default: Show all types
  // Extract unique instrument types
  const instrumentTypes = useMemo(() => {
    if (!Array.isArray(instrumentsData)) return [];
    return [
      "Alle Typen",
      ...new Set(instrumentsData.map((instrument) => instrument.type)),
    ];
  }, [instrumentsData]);
  // Memoized filtered instruments with search and type filtering
  const filteredInstruments = useMemo(() => {
    if (!Array.isArray(instrumentsData)) return [];

    return instrumentsData.filter((instrument) => {
      if (!instrument) return false;

      const matchesSearch =
        (instrument.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (instrument.symbol || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === "" || // All types selected
        selectedType === "Alle Typen" ||
        instrument.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType, instrumentsData]);

  // Simulate loading state (remove in production)
  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-blue-600 flex items-center">
          <Database className="mr-2 animate-bounce" size={32} />
          <span className="text-xl font-semibold">Daten werden geladen...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Finanzinstrumente Übersicht
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Entdecken Sie umfassende Informationen zu verschiedenen
          Finanzinstrumenten mit detaillierten Einblicken und präzisen Daten.
        </p>
      </header>

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
      {filteredInstruments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument) => (
            <InstrumentCard
              key={instrument._id}
              price
              onDetails={() => navigate(`/instrument/${instrument.symbol}`)}
              instrument={instrument}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Keine Instrumente gefunden
          </h3>
          <p className="text-gray-500">
            Bitte passen Sie Ihre Suchkriterien an oder erweitern Sie Ihre
            Suche.
          </p>
        </div>
      )}
    </div>
  );
};

export default FinancialPlatformDashboard;
