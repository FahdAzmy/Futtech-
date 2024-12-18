import { useEffect, useState } from "react";
import { GetInstruments } from "../api/api";

export default function useGetInstruments() {
  const [loading, setLoading] = useState(false);
  const [instrumentsData, setInstrumentsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const Insuruments = await GetInstruments();
        setInstrumentsData(Insuruments);
      } catch (error) {
        console.error("Error Fetching Insurments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { loading, instrumentsData, setLoading };
}
