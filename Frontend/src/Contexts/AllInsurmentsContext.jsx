/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import useGetInstruments from "../Hooks/GetInstruments";
const InstrumentsContext = createContext();
export const InstrumentsProvider = ({ children }) => {
  const { instrumentsData, loading, setLoading } = useGetInstruments();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const value = {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    loading,
    instrumentsData,
    setLoading,
  };

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
    <InstrumentsContext.Provider value={value}>
      {children}
    </InstrumentsContext.Provider>
  );
};

export const useInstrumentsContext = () => useContext(InstrumentsContext);
