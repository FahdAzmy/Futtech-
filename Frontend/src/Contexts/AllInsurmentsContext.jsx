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

  return (
    <InstrumentsContext.Provider value={value}>
      {children}
    </InstrumentsContext.Provider>
  );
};

export const useInstrumentsContext = () => useContext(InstrumentsContext);
