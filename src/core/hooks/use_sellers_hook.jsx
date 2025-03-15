import { useState, useEffect } from "react";
import DataService from "../../services/data_service";

const useSellers = (options = {}) => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        let result = [];

        if (options.topSellers) {
          result = DataService.getTopSellers(options.limit);
        } else {
          result = DataService.getAllSellers();

          if (options.limit) {
            result = result.slice(0, options.limit);
          }
        }

        setSellers(result);
        setError(null);
      } catch (err) {
        console.error("Error fetching sellers:", err);
        setError("Failed to load sellers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, [options.topSellers, options.limit]);

  return { sellers, loading, error };
};

export default useSellers;
