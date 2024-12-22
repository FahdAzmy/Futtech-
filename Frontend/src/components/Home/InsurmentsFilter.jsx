import { useMemo } from "react";
import InstrumentCard from "./InstrumentCard";
import { useNavigate } from "react-router-dom";
import { useInstrumentsContext } from "../../Contexts/AllInsurmentsContext";

export default function InsurmentsFilter() {
  const { instrumentsData, searchTerm, selectedType } = useInstrumentsContext();
  const navigate = useNavigate();

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

  return (
    <div>
      {filteredInstruments.length > 0 ? (
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
          {filteredInstruments.map((instrument) => (
            <InstrumentCard
              key={instrument._id}
              onDetails={() =>
                navigate(`/instrument/${instrument.symbol}`, {
                  state: { instrument },
                })
              }
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
}
