import { useEffect, useState } from "react";
import { GetInstrument } from "../api/api";
import { useParams } from "react-router-dom";

export default function useGetInstrument() {
  const [loading, setLoading] = useState(false);
  const [instrument, setInstrument] = useState([]);
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const Insuruments = await GetInstrument(symbol);
        setInstrument(Insuruments);
      } catch (error) {
        console.error("Error Fetching Insurments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { loading, instrument, setLoading };
}
