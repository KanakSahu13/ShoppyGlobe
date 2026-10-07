import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { selectCartItems, selectCartTotal } from "../../redux/cartSlice";
import "./Cart.css";

function Cart() {
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    if (items.length === 0) {
        return <div className="empty-state">
            <h1>Your cart is empty</h1>
            <p>Add something from the catalogue to get started.</p>
            <Link className="button-link" to="/">Continue Shopping</Link>
        </div>
    }

    return (
        <section>
            <div className="section-heading">
                <h1>Your Cart</h1>
                <p>{items.length} unique item{items.length === 1 ? '' : 's'}</p>
            </div>
            <div className="cart-layout">
                <div className="cart-list">
                    {items.map((item) => <CartItem key={item.id} item={item} />)}
                </div>
                <aside className="cart-summary">
                    <h2>Order Summary</h2>
                    <div>
                        <span>Subtotal</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                    <hr />
                    <div className="summary-total">
                        <span>Total</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                    <Link className="button-link checkout-link" to="/checkout">Proceed to checkout</Link>
                </aside>
            </div>
        </section>
    )
}

export default Cart;