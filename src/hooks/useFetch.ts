import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const useFetch = <T = any>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<T>(url);
      console.log("Fetched data:", res.data);
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const reFetch = fetchData;

  return { data, loading, error, reFetch };
};

export default useFetch;
