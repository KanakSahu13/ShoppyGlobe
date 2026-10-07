import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, selectCartItems, selectCartTotal } from "../../redux/cartSlice";
import "./Checkout.css";

function Checkout() {
    const items = useSelector(selectCartItems);
    const total= useSelector(selectCartTotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [form, setForm] = useState({ 
        name: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        if (!orderPlaced) return;

        // give the confirmation message a moment to be visible before redirecting to home
        const timer = setTimeout(() => {
            navigate('/');
        }, 1500);
        
        return () => clearTimeout(timer);
    }, [orderPlaced, navigate]);

    if (items.length === 0 && !orderPlaced) {
        return <div className="empty-state">
            <h1>Nothing to checkout</h1>
            <p>Your cart is currently empty.</p>
        </div>
    }

    const handleChange = (event) => setForm({
        ...form, [event.target.name]: event.target.value
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        setOrderPlaced(true);
        dispatch(clearCart());
    }

    return (
        <>
            <section className="checkout-layout">
                <div className="checkout-form-card">
                    <h1>Checkout</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input name="name" value={form.name} onChange={handleChange} required />
                        </label>
                        <label>
                            Email
                            <input type="email" name="email" value={form.email} onChange={handleChange} required />
                        </label>
                        <label>
                            Address
                            <textarea name="address" value={form.address} onChange={handleChange} required rows="4" />
                        </label>
                        <button type="submit" disabled={orderPlaced}>Place Order</button>

                    </form>
                </div>
                <aside className="cart-summary">
                    <h2>Products</h2>
                    {items.map((item) => <div className="checkout-line" key={item.id}>
                        <span>{item.title} x {item.quantity}</span>
                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>)}

                    <hr />

                    <div className="summary-total">
                        <span>Total</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                </aside>
            </section>
        
            {orderPlaced && (
                <div className="order-confirmation" role="status" aria-live="polite">
                    <div className="order-confirmation-card">
                        <div className="success-icon">✓</div>
                            <h2>Order placed!</h2>
                            <p>Your order was placed successfully.</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Checkout;