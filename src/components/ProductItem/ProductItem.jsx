import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import "./ProductItem.css";

function ProductItem({ product }) {
    const dispatch = useDispatch();

    return (
        <article className="product-card">
            <Link to={`/products/${product.id}`} className="product-image-link">
                <img src={product.thumbnail} alt={product.title} loading="lazy" />
            </Link>

            <div className="product-card-body">
                <p className="category">
                    {product.category}
                </p>
                <h2>
                    <Link to={`/products/${product.id}`}>
                        {product.title}
                    </Link>
                </h2>
                <p className="price">
                    ${product.price.toFixed(2)}
                </p>
                <button type="button" onClick={() => dispatch(addToCart(product))}>
                    Add to Cart
                </button>
            </div>
        </article>
    )
}

ProductItem.PropTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired
};

export default ProductItem;