import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import "./ProductDetail.css";

function ProductDetail() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        async function fetchProduct() {
            try {
                setLoading(true);
                setError('');

                const response = await fetch(`https://dummyjson.com/products/${productId}` , {
                    signal: controller.signal
                });
                if (!response.ok) throw new Error(`Product ${productId} could not be found.`);
                setProduct(await response.json());
            } catch(err) {
                if (err.name !== 'AbortError') setError(err.message || 'Failed to load product details.');
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        fetchProduct();
        return () => controller.abort();
    }, [productId]);

    if (loading) return <p className="status">Loading product details...</p>;
    if (error) return <div className="status error">
        <h1>Product unavailable</h1>
        <p>{error}</p>
        <Link to="/">Back to Home</Link>
    </div>

    return (
        <article className="detail-card">
            <div className="detail-gallery">
                <img src={product.images?.[0] || product.thumbnail} alt={product.title} loading="lazy" decoding="async" />
            </div>
            <div className="detail-copy">
                <p className="category">{product.category}</p>
                <h1>{product.title}</h1>
                <p className="detail-description">{product.description}</p>
                <p className="price detail-price">${product.price.toFixed(2)}</p>
                <p>Rating: {product.rating}</p>
                <p>Stock: {product.stock}</p>
                <button type="button" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            </div>
        </article>
    )
}

export default ProductDetail;