import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../redux/cartSlice";
import "./CartItem.css";

function CartItem({ item }) {
    const dispatch = useDispatch();

    return (
        <article className="cart-item">
            <img src={item.thumbnail} alt={item.title} loading="lazy" />
            <div className="cart-item-info">
                <h2>{item.title}</h2>
                <p>${item.price.toFixed(2)} each</p>

                <div className="quantity-control">
                    <button type="button" onClick={() => dispatch(decreaseQuantity(item.id))} disabled={item.quantity ===1} aria-label={`Decrease ${item.title}`}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => dispatch(increaseQuantity(item.id))} aria-label={`Increase ${item.title}`}>+</button>
                </div>
            </div>
            <div className="cart-item-action">
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                <button type="button" className="danger-button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
        </article>
    )
}

CartItem.PropTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired
}

export default CartItem; 