import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) {
      setData([]);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          setError("failed to fetch data");
          setData([]);
          setLoading(false);
          return;
        }

        const result = await res.json();
        setData(result.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setData([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
