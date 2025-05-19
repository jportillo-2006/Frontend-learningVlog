import { useEffect, useState } from "react";

export const useFetch = (fetchFunction, params = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const response = await fetchFunction(params);
    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [JSON.stringify(params)]);

  return { data, loading, reload: loadData };
};