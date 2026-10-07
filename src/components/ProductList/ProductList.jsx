import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectSearchQuery } from "../../redux/searchSlice";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";

function ProductList({ products, loading, error }) {
    const query = useSelector(selectSearchQuery).trim().toLowerCase();

    if (loading) return <p className="status">Loading products...</p>;
    if (error) return <p className="status error">Unable to load products: {error}</p>;

    // search is kept in Redux so the header and catalogue share one source of truth
    const filteredProducts = products.filter((product) => 
    `${product.title} ${product.category}`.toLowerCase().includes(query));

    return (
        <section>
            <div className="section-heading">
                <h1>Explore products</h1>
                <p>{filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'} found</p>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="status">No products match your search.</p>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map((product) => <ProductItem key={product.id} product={product} />)}
                </div>
            )}
        </section>
    )
}

ProductList.PropTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            category: PropTypes.string,
            price: PropTypes.number.isRequired,
            thumbnail: PropTypes.string.isRequired
        })).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default ProductList;