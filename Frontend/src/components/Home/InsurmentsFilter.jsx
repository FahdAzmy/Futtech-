import { useMemo } from "react";
import InstrumentCard from "./InstrumentCard";
import { useNavigate } from "react-router-dom";
import { useInstrumentsContext } from "../../Contexts/AllInsurmentsContext";
import CardSkelaton from "./CardSkelaton";

export default function InsurmentsFilter() {
  const { instrumentsData, searchTerm, selectedType, loading } =
    useInstrumentsContext();
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

  if (loading) {
    <CardSkelaton />;
  }

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
        <div className="flex gap-2">
          <CardSkelaton />
          <CardSkelaton />
          <CardSkelaton />
        </div>
      )}
    </div>
  );
}
