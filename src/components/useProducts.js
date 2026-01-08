import { useEffect, useState } from "react";

export default function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError("");

        const url =
          category === "all"
            ? "https://fakestoreapi.com/products?sort=asc"
            : `https://fakestoreapi.com/products/category/${category}`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to load products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        if (err.message === "Failed to fetch")
          setError("Network error. Please check your connection.");
        else setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [category]);
  return { products, isLoading, error };
}
