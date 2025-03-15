import { useState, useEffect } from "react";
import DataService from "../../services/data_service";

const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let result = [];

        if (options.category) {
          result = DataService.getProductsByCategory(options.category);
        } else if (options.discounted) {
          result = DataService.getDiscountedProducts(options.limit);
        } else {
          result = DataService.getAllProducts();
        }

        if (options.limit && !options.discounted) {
          result = result.slice(0, options.limit);
        }

        setProducts(result);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options.category, options.discounted, options.limit]);

  return { products, loading, error };
};

export default useProducts;
