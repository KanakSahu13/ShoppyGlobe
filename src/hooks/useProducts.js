import { useEffect, useState } from "react";

const PRODUCTS_URL = "https://dummyjson.com/products";

// fetches the product catalogue and exposes loading / error state
export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProducts() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(PRODUCTS_URL, {
                    signal: controller.signal
                });

                if (!response.ok) throw new Error(`Unable to load products (HTTP ${response.status}).`);

                const data = await response.json();
                setProducts(data.products ?? []);
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message || "Something went wrong while loading products.");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }
        fetchProducts();
        return () => controller.abort();
    }, []);
    return { products, loading, error };
}